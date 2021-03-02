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
        导出
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
        width="135px"
      >
        <template slot-scope="{ row }">
          <span>{{ row.createdate }}</span>
        </template>
      </el-table-column>
      <el-table-column label="主要问题" min-width="100px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>
      <el-table-column label="行政区域" align="center" width="120px">
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
      <el-table-column label="拍摄人员" align="center" width="120px">
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
        width="420"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="info" size="mini" @click="onPreview(row)">
            图片查看
          </el-button>
          <el-button type="info" size="mini" @click="onReImagePreview(row)">
            复核图片
          </el-button>
          <el-button type="warning" size="mini" @click="download(row)">
            文档下载
          </el-button>
          <el-button
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
    <el-image-viewer
      v-if="showViewer"
      :on-close="closeViewer"
      :url-list="photoList"
    />
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="right"
        label-width="130px"
        style="width: 500px; margin-left: 50px"
      >
        <el-form-item label="具体时间" prop="createdate">
          <el-date-picker
            v-model="temp.createdate"
            type="date"
            placeholder="请选择具体时间"
            format="yyyy-MM-dd HH:mm"
            value-format="yyyy-MM-dd HH:mm"
          />
        </el-form-item>
        <el-form-item label="问题描述" prop="description">
          <el-input
            v-model="temp.description"
            placeholder="请输入问题描述"
            maxlength="50"
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
        <el-form-item label="道路（地区）或街道" prop="road">
          <el-input v-model="temp.road" />
        </el-form-item>
        <el-form-item label="具体位置" prop="place">
          <el-input v-model="temp.place" />
        </el-form-item>
        <el-form-item label="整改情况" prop="status">
          <el-select
            v-model="temp.status"
            class="filter-item"
            placeholder="整改情况"
          >
            <el-option
              v-for="item in statusOptions"
              :key="item"
              :label="item"
              :value="item"
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
            :limit="3"
            :file-list="picList"
            :on-exceed="exceed"
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
        </el-form-item>
        <el-form-item label="复核图片" prop="repics">
          <el-upload
            ref="uploadRePic"
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit="3"
            :file-list="repicList"
            :on-exceed="exceed"
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
                  @click="handleRemoveReImage(file)"
                >
                  <i class="el-icon-delete" />
                </span>
              </span>
            </div>
          </el-upload>
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
        <el-form-item label="上传文档" prop="docs">
          <el-upload
            ref="uploadDoc"
            action="#"
            :on-remove="handleRemoveDoc"
            :file-list="docsList"
            :auto-upload="false"
            :limit="1"
            accept=".doc,.docx"
            :on-exceed="exceedDoc"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false"> 取消 </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确认
        </el-button>
      </div>
    </el-dialog>
    <el-dialog :visible.sync="dialogVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="">
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
        >确认</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { fetchPv } from '@/api/article'
import waves from '@/directive/waves' // waves directive
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { parseTime } from '@/utils'
import {
  fetchIssueTypes,
  fetchDistrict,
  fetchIssues,
  createIssue,
  updateIssue,
  deleteIssue
} from '@/api/env'
import ElImageViewer from 'element-ui/packages/image/src/image-viewer'

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
  components: { Pagination, ElImageViewer },
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
      showViewer: false,
      picList: [],
      repicList: [],
      photoList: [],
      listLoading: true,
      month: '',
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
      docsList: [],
      calendarTypeOptions,
      sortOptions: [
        { label: 'ID Ascending', key: '+id' },
        { label: 'ID Descending', key: '-id' }
      ],
      statusOptions: ['', '已整改', '未整改'],
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
        filmdate: new Date(),
        road: '',
        place: '',
        status: ''
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
        district: [{ required: true, message: '片区必填', trigger: 'blur' }],
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
    download(row) {
      if (row.docPath) {
        window.open('http://localhost:7779/file/doc/' + row.docPath.trim())
      } else {
        this.$message.error('该信息没有上传文件！')
      }
    },
    exceed(files, fileList) {
      this.$message.error('最多上传3张图片！')
    },
    exceedDoc(files, fileList) {
      this.$message.error('最多上传1个文档！')
    },
    dateFormat(time) {
      var date = new Date(time)
      var year = date.getFullYear()
      var month =
        date.getMonth() + 1 < 10
          ? '0' + (date.getMonth() + 1)
          : date.getMonth() + 1
      var day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      var hour = date.getHours()
      var minute = date.getMinutes()
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    },
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
    onPreview(row) {
      this.photoList = []
      var path = row.imagesPath
      if (path) {
        var pathArr = path.split(',')
        pathArr.forEach((item) => {
          this.photoList.push(
            'http://localhost:7779/file/image/' + item.trim()
          )
        })
      }
      this.showViewer = true
    },
    onReImagePreview(row) {
      this.photoList = []
      var path = row.reImagesPath
      if (path) {
        var pathArr = path.split(',')
        pathArr.forEach((item) => {
          this.photoList.push(
            'http://localhost:7779/file/image/' + item.trim()
          )
        })
      }
      this.showViewer = true
    },
    closeViewer() {
      this.photoList = []
      this.showViewer = false
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
        createdate: this.dateFormat(new Date()),
        description: '',
        areaName: this.area,
        area: this.area,
        district: '',
        issueType: '',
        comment: '',
        type: this.type,
        filmMaker: '',
        filmdate: this.dateFormat(new Date()),
        road: '',
        place: '',
        status: ''
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
      if (this.$refs.uploadDoc) {
        this.$refs.uploadDoc.clearFiles()
      }
      if (this.$refs.uploadRePic) {
        this.$refs.uploadRePic.clearFiles()
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
          const fileList = this.$refs.uploadPic.uploadFiles
          fileList.map((item) => {
            formData.append('imagesfile', item.raw)
          })
          const refileList = this.$refs.uploadRePic.uploadFiles
          refileList.map((item) => {
            formData.append('recheckimages', item.raw)
          })
          const docList = this.$refs.uploadDoc.uploadFiles
          docList.map((item) => {
            formData.append('doc', item.raw)
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

      // show images
      this.picList = []
      var path = row.imagesPath
      if (path) {
        var pathArr = path.split(',')
        pathArr.forEach((item) => {
          const imageUrl = 'http://localhost:7779/file/image/' + item.trim()
          const imageName = item
            .trim()
            .substring(item.trim().lastIndexOf('\\') + 1)
          this.picList.push({ name: imageName, url: imageUrl })
        })
      }

      // show recheck images
      this.repicList = []
      var repath = row.reImagesPath
      if (repath) {
        var pathArr1 = repath.split(',')
        pathArr1.forEach((item) => {
          const reimageUrl = 'http://localhost:7779/file/image/' + item.trim()
          const reimageName = item
            .trim()
            .substring(item.trim().lastIndexOf('\\') + 1)
          this.repicList.push({ name: reimageName, url: reimageUrl })
        })
      }

      // show doc
      this.docsList = []
      var docpath = row.docPath
      if (docpath) {
        var pathArr2 = docpath.split(',')
        pathArr2.forEach((item) => {
          const docUrl = 'http://localhost:7779/file/doc/' + item.trim()
          const docName = item
            .trim()
            .substring(item.trim().lastIndexOf('\\') + 1)
          this.docsList.push({ name: docName, url: docUrl })
        })
      }
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate((valid) => {
        if (valid) {
          // const tempData = Object.assign({}, this.temp);
          const formData = new FormData()
          for (const key in this.temp) {
            formData.append(key, this.temp[key])
          }
          const fileList = this.$refs.uploadPic.uploadFiles

          fileList.map((item) => {
            formData.append('imagesfile', item.raw)
          })
          const refileList = this.$refs.uploadRePic.uploadFiles
          refileList.map((item) => {
            formData.append('recheckimagesfile', item.raw)
          })
          const docList = this.$refs.uploadDoc.uploadFiles
          docList.map((item) => {
            formData.append('docfile', item.raw)
          })

          updateIssue(formData).then(() => {
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
          this.getList()
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
    handleRemoveReImage(file) {
      const fileList = this.$refs.uploadRePic.uploadFiles
      const index = fileList.findIndex((fileItem) => {
        return fileItem.uid === file.uid
      })
      fileList.splice(index, 1)
    },
    handleRemoveDoc(file, fileList) {
      console.log(file, fileList)
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
        const letter = [
          'A',
          'B',
          'C',
          'D',
          'E',
          'F',
          'G',
          'H',
          'I',
          'J',
          'K',
          'L',
          'M',
          'N',
          'O',
          'P',
          'Q',
          'R',
          'S',
          'T',
          'U',
          'V',
          'W',
          'X',
          'Y',
          'Z'
        ]
        const tHeader = ['', '', '', '早', '中', '晚', '', '']
        for (const item in this.issueTypes) {
          tHeader.push(this.issueTypes[item].name)
        }
        tHeader.push('')
        var firstlineEndA = Math.floor(tHeader.length / letter.length)
        var fisrtlineEndB = tHeader.length % letter.length
        var cellIdx = ''
        if (firstlineEndA > 0) {
          cellIdx = letter[firstlineEndA - 1]
        }
        cellIdx = cellIdx + letter[fisrtlineEndB - 1]

        var merges = ['D3:F3', 'A3:A4', 'B3:B4', 'C3:C4', 'G3:G4', 'H3:H4']
        merges.push('A1:' + cellIdx + '1')
        merges.push('A2:' + cellIdx + '2')

        var typesIdx = 8 + this.issueTypes.length
        var typefirst = Math.floor(typesIdx / letter.length)
        var typesecond = typesIdx % letter.length
        var tidx = ''
        if (typefirst > 0) {
          tidx = letter[typefirst - 1]
        }
        tidx = tidx + letter[typesecond - 1]

        merges.push('I3:' + tidx + '3')

        var commentIdx = typesIdx + 1
        var commentfirst = Math.floor(commentIdx / letter.length)
        var commentsecond = commentIdx % letter.length
        var cidx = ''
        if (commentfirst > 0) {
          cidx = letter[commentfirst - 1]
        }
        cidx = cidx + letter[commentsecond - 1]

        merges.push(cidx + '3:' + cidx + '4')

        var firstLine = ['四中队巡查情况登记表']
        for (var i = 0; i < tHeader.length - 1; i++) {
          firstLine.push('')
        }

        var secondLine = []
        for (var j = 0; j < tHeader.length; j++) {
          secondLine.push('')
        }

        var thirdLine = [
          '序号',
          '区属中队',
          '日期',
          '具体时间',
          '',
          '',
          '道路（街道）或地区',
          '具体位置',
          '问题类型'
        ]
        for (var m = 0; m < this.issueTypes.length - 1; m++) {
          thirdLine.push('')
        }
        thirdLine.push('备注')

        const multiHeader = [firstLine, secondLine, thirdLine]
        const filterVal = [
          'id',
          'districtName',
          'createdate',
          'morning',
          'noon',
          'night',
          'road',
          'place'
        ]
        for (const item in this.issueTypes) {
          filterVal.push(this.issueTypes[item].name)
        }
        filterVal.push('comment')
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          multiHeader,
          header: tHeader,
          merges,
          data,
          filename: '督察数据库' + this.dateFormat(new Date())
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      var i = 1
      return this.list.map((v) =>
        filterVal.map((j) => {
          if (j === 'id') {
            return i++
          } else if (j === 'createdate') {
            return parseTime(v[j], '{y}-{m}-{d}')
          } else if (j === 'morning' || j === 'noon' || j === 'night') {
            var c = parseTime(v['createdate'], '{h}')
            if (c > 0 && c < 8) {
              if (j === 'morning') {
                return parseTime(v['createdate'], '{h}:{i}')
              } else {
                return ''
              }
            } else if (c < 16) {
              if (j === 'noon') {
                return parseTime(v['createdate'], '{h}:{i}')
              } else {
                return ''
              }
            } else {
              if (j === 'night') {
                return parseTime(v['createdate'], '{h}:{i}')
              } else {
                return ''
              }
            }
          } else if (
            j !== 'id' &&
            j !== 'districtName' &&
            j !== 'createdate' &&
            j !== 'morning' &&
            j !== 'noon' &&
            j !== 'night' &&
            j !== 'road' &&
            j !== 'place' &&
            j !== 'comment'
          ) {
            if (v['issueTypeName'] === j) {
              return '√'
            } else {
              return ''
            }
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
