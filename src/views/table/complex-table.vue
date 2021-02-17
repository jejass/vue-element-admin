<template>
  <div class="app-container">
    <div class="filter-container">
      <el-date-picker
        v-model="month"
        type="monthrange"
        unlink-panels
        range-separator="至"
        start-placeholder="开始月份"
        end-placeholder="结束月份"
        class="filter-item"
        value-format="yyyy-MM"
      />
      <!-- <el-date-picker v-model="listQuery.month" type="month" placeholder="选择月" class="filter-item" style="width:150px"></el-date-picker> -->
      <el-select
        v-model="listQuery.district"
        placeholder="片区（中队）"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="item in districts"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
      <el-select
        v-model="listQuery.issueType"
        placeholder="问题类型"
        clearable
        style="width: 150px"
        class="filter-item"
      >
        <el-option
          v-for="item in issueTypes"
          :key="item.id"
          :label="item.issueType"
          :value="item.id"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        搜索
      </el-button>
      <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        Export
      </el-button>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column
        label="创建时间"
        prop="createdate"
        align="center"
        width="95"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createdate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主要问题" min-width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行政区域" width="150px">
        <template slot-scope="{ row }">
          <span>{{ row.areaName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="片区（中队）" width="220px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.districtName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="问题类型" width="150px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.issueTypeName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拍摄人员" width="120px">
        <template slot-scope="{ row }">
          <span>{{ row.filmMaker }}</span>
        </template>
      </el-table-column>
      <el-table-column label="拍摄时间" align="center" width="95">
        <template slot-scope="{ row }">
          <span>{{ row.filmdate }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>

          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item label="创建时间" prop="createdate">
          <el-date-picker
            v-model="temp.createdate"
            type="date"
            placeholder="请选择创建时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="问题描述" prop="description">
          <el-input
            v-model="temp.description"
            placeholder="请输入问题描述"
            maxlength="80"
            show-word-limit
            clearable
          />
        </el-form-item>
        <el-form-item label="行政区域" prop="areaName">
          <el-input v-model="temp.areaName" :disabled="true" />
        </el-form-item>
        <el-form-item label="片区（中队）" prop="district">
          <el-select
            v-model="temp.district"
            class="filter-item"
            placeholder="请选择片区"
          >
            <el-option
              v-for="item in districts"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="问题类型" prop="issueType">
          <el-select
            v-model="temp.issueType"
            class="filter-item"
            placeholder="请选择问题类型"
          >
            <el-option
              v-for="item in issueTypes"
              :key="item.id"
              :label="item.issueType"
              :value="item.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="备注">
          <el-input
            v-model="temp.comment"
            type="textarea"
            placeholder="请输入备注"
            maxlength="249"
            show-word-limit
            clearable
            :rows="7"
            resize="none"
          />
        </el-form-item>
        <el-form-item label="上传图片" prop="pics">
          <el-upload
            ref="uploadPic"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :file-list="fileList"
          >
            <i slot="default" class="el-icon-plus" />
            <div slot="file" slot-scope="{ file }">
              <img
                class="el-upload-list__item-thumbnail"
                :src="file.url"
                alt=""
              >
              <span class="el-upload-list__item-actions">
                <span
                  class="el-upload-list__item-preview"
                  @click="handlePictureCardPreview(file)"
                >
                  <i class="el-icon-zoom-in" />
                </span>
                <span
                  class="el-upload-list__item-delete"
                  @click="handleRemove(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" append-to-body>
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="拍摄时间" prop="filmdate">
          <el-date-picker
            v-model="temp.filmdate"
            type="date"
            placeholder="请选择拍摄时间"
            value-format="yyyy-MM-dd"
          />
        </el-form-item>
        <el-form-item label="拍摄人" prop="filmMaker">
          <el-input
            v-model="temp.filmMaker"
            placeholder="请输入拍摄人"
            maxlength="10"
            clearable
          />
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> Cancel </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          Confirm
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >Confirm</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchPv
} from '@/api/article'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import {
  fetchIssueTypes,
  fetchDistrict,
  fetchIssues,
  createIssue,
  updateIssue,
  deleteIssue
} from '@/api/env'

const calendarTypeOptions = [
  { key: 'CN', display_name: 'China' },
  { key: 'US', display_name: 'USA' },
  { key: 'JP', display_name: 'Japan' },
  { key: 'EU', display_name: 'Eurozone' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      month: '',
      fileList: [],
      listQuery: {
        page: 1,
        limit: 10,
        startMonth: '',
        endMonth: '',
        district: '',
        issueType: '',
        type: '',
        area: ''
      },
      issueTypes: [],
      districts: [],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: false,
      temp: {
        id: 0,
        createdate: new Date(),
        description: '',
        areaName: this.area,
        area: this.area,
        district: 0,
        issueType: 0,
        comment: '',
        type: this.type,
        filmMaker: '',
        filmdate: new Date()
      },
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新增'
      },
      areaMap: {
        gxq: '高新区',
        gsq: '姑苏去',
        wzq: '吴中区',
        wjq: '吴江区',
        xcq: '相城区',
        gyyq: '工业园区'
      },
      typeMap: {
        zzb: '1',
        rcxc: '2',
        gdhc: '3',
        gdcc: '4',
        wtsl: '5',
        zglxd: '6',
        ldjb: '7',
        wmcs: '8'
      },
      dialogPvVisible: false,
      dialogImageUrl: '',
      dialogVisible: false,
      pvData: [],
      rules: {
        district: [
          { required: true, message: '片区必填', trigger: 'blur' }
        ],
        issueType: [
          { required: true, message: '问题类型必选', trigger: 'blur' }
        ],
        createdate: [
          {
            required: true,
            message: '创建时间必填',
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: '问题描述必填', trigger: 'blur' }
        ]
      },
      downloadLoading: false
    }
  },
  computed: {
    area() {
      return this.$route.meta.area
    },
    type() {
      return this.$route.meta.type
    }
  },
  created() {
    this.getList()
    this.getIssueTypes()
    this.getDistricts(this.area)
  },
  methods: {
    getList() {
      this.listLoading = true
      if (this.month[0]) {
        this.listQuery.startMonth = this.month[0]
      }
      if (this.month[1]) {
        this.listQuery.endMonth = this.month[1]
      }
      this.listQuery.type = this.type
      this.listQuery.area = this.area
      fetchIssues(this.listQuery).then((response) => {
        this.list = response.items
        this.total = response.total
        this.listLoading = false
      })
    },
    getIssueTypes() {
      fetchIssueTypes().then((response) => {
        this.issueTypes = response
      })
    },
    getDistricts(area) {
      fetchDistrict(area).then((response) => {
        this.districts = response
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: 0,
        createdate: new Date(),
        description: '',
        areaName: this.area,
        area: this.area,
        district: '',
        issueType: '',
        comment: '',
        type: this.type,
        filmMaker: '',
        filmdate: new Date()
      }
    },
    handleCreate() {
      this.resetTemp()
      this.temp.areaName = this.areaMap[this.area]
      this.temp.type = this.typeMap[this.type]
      this.dialogStatus = 'create'
      if (this.$refs.uploadPic) {
        this.$refs.uploadPic.clearFiles()
      }
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const formData = new FormData()
          for (const key in this.temp) {
            formData.append(key, this.temp[key])
          }
          this.fileList.map(item => {
            formData.append('photo', item.raw)
          })

          createIssue(formData).then(() => {
            // this.list.unshift(this.temp);
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: 'Success',
              message: '创建成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.temp.areaName = this.areaMap[this.area]
      this.temp.type = this.typeMap[this.type]
      this.temp.area = this.area
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateIssue(tempData).then(() => {
            this.getList()
            this.dialogFormVisible = false
            this.$notify({
              title: 'Success',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row, index) {
      this.$confirm('确定要删除这条问题吗?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async() => {
          await deleteIssue(row.id)
          this.list.splice(index, 1)
          this.$notify({
            title: 'Success',
            message: '删除成功',
            type: 'success',
            duration: 2000
          })
        })
        .catch((err) => {
          console.error(err)
        })
    },
    handleRemove(file) {
      const fileList = this.$refs.uploadPic.uploadFiles
      const index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      fileList.splice(index, 1)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleFetchPv(pv) {
      fetchPv(pv).then((response) => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then((excel) => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }
  }
}
</script>
