<template>
    <div>
        <el-form ref="form" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="姓名" required>
                <el-input v-model="name" placeholder="请输入姓名" :disabled="cacheProps.isUpdate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">

              <el-form-item label="通讯地址" required>
                <el-select v-model="mailProvince" placeholder="请选择" style="width: 30%" @change="onMailProviceChange">
                    <el-option v-for="province in city" :key="province.code" :label="province.name" :value="province.code"></el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;
                <el-select v-model="mailCity" placeholder="请选择" style="width: 30%" @change="onMailCityChange">
                    <el-option v-for="city in mailCities" :key="city.code" :label="city.name" :value="city.code"></el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;
                <el-select v-model="mailDistrict" placeholder="请选择" style="width: 30%">
                    <el-option v-for="district in mailDistricts" :key="district.code" :label="district.name" :value="district.code"></el-option>
                </el-select>
              </el-form-item>
              
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="身份证号" required>
                <el-input v-model="idcard" placeholder="请输入身份证号" :disabled="cacheProps.isUpdate"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="详细地址">
                <el-input v-model="mailAddress" placeholder="请输入详细地址"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="手机号" required>
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="最高学历" required>
                <el-select v-model="degree" placeholder="请选择">
                  <el-option label="高中" :value="1"></el-option>
                  <el-option label="中专" :value="2"></el-option>
                  <el-option label="大专" :value="3"></el-option>
                  <el-option label="本科" :value="4"></el-option>
                  <el-option label="研究生" :value="5"></el-option>
                  <el-option label="博士" :value="6"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="性别" required>
                <el-select v-model="gender" placeholder="请选择">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="毕业院校" required>
                <el-input v-model="graduateSchool" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="证书类型" required>
                <el-select v-model="certificateType" placeholder="请选择">
                  <el-option label="执业药师" :value="1"></el-option>
                  <el-option label="从业药师" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="毕业专业" required>
                <el-input v-model="graduateMajor" placeholder="请输入"></el-input>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="执业类别" required>
                <el-select v-model="certificateCategory" placeholder="请选择">
                  <el-option label="药学" :value="1"></el-option>
                  <el-option label="中药学" :value="2"></el-option>
                  <el-option label="药学双证" :value="3"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="职称" required>
                <el-select v-model="professionalTitle" placeholder="请选择">
                  <el-option label="无" :value="1"></el-option>
                  <el-option label="初级" :value="2"></el-option>
                  <el-option label="中级" :value="3"></el-option>
                  <el-option label="副高" :value="4"></el-option>
                  <el-option label="高级" :value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="资格证书" required>
                <el-input v-model="certificateNo" placeholder="请输入资格证书"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="政治面貌">
                <el-select v-model="politicalOutlook" placeholder="请选择">
                  <el-option label="团员" :value="1"></el-option>
                  <el-option label="党员" :value="2"></el-option>
                  <el-option label="民主党派" :value="3"></el-option>
                  <el-option label="群众" :value="4"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="">
                <div style="font-size: 12px; font-weight: 400; color: rgba(255, 87, 51, 1); line-height: 16.8px;">
                  2017年前通过的填写资格证书编号，17年及以后的填写管理号
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="民族">
                <el-select v-model="nation" placeholder="请选择">
                  <el-option label="汉族" :value="1"></el-option>
                  <el-option label="少数民族" :value="2"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="批准日期" required>
                <el-date-picker style="width:100%" v-model="certificateDate" type="date" placeholder="请输入日期" ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="工作单位" required>
                <el-input v-model="workPlace" placeholder="请输入工作单位"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="职业范围" required>
                <el-select v-model="certificateRange" placeholder="请选择">
                  <el-option label="生产企业" :value="1"></el-option>
                  <el-option label="经营(批发)" :value="2"></el-option>
                  <el-option label="经营(单体)" :value="3"></el-option>
                  <el-option label="经营(连锁)" :value="4"></el-option>
                  <el-option label="研发" :value="5"></el-option>
                  <el-option label="医疗机构" :value="6"></el-option>
                  <el-option label="检验" :value="7"></el-option>
                  <el-option label="其他" :value="8"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="11">
              <el-form-item label="所属城市" required>
                <el-select v-model="areaProvince" placeholder="请选择" style="width: 30%" @change="onProvinceChange">
                    <el-option v-for="province in city" :key="province.code" :label="province.name" :value="province.code"></el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;
                <el-select v-model="areaCity" placeholder="请选择" style="width: 30%" @change="onCityChange">
                    <el-option v-for="city in cities" :key="city.code" :label="city.name" :value="city.code"></el-option>
                </el-select>
                &nbsp;&nbsp;&nbsp;
                <el-select v-model="areaDistrict" placeholder="请选择" style="width: 30%">
                    <el-option v-for="district in districts" :key="district.code" :label="district.name" :value="district.code"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
  
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="电子邮箱" required>
                <el-input v-model="email" placeholder="请输入电子邮箱"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
    </div>
</template>

<script>
import { defineComponent, ref } from 'vue'
import cityJson from '@/assets/citylist_new.json'
import { ElMessage } from 'element-plus'
import dayjs from 'dayjs';
import axios from '@/axios'

export default defineComponent({
    name: "StudentDetailComponet",
    props: {
      needGetUserInfo: {
        type: Boolean,
        required: false
      },
      isUpdate: {
        type: Boolean
      }
    },
    setup(props) {
        const id = ref(null)
        const cacheProps = Object.assign({}, props)
        if (props.needGetUserInfo) {
            axios.get(`/api/client/student/v1/info`).then(r => {
              if (r.data.code == 1) {
                // 将结果集的值赋值给 ref 变量
                id.value = r.data.data.id
                name.value = r.data.data.name;
                areaProvince.value = r.data.data.areaProvince.toString();
                idcard.value = r.data.data.idcard;
                mailAddress.value = r.data.data.mailAddress;
                phone.value = r.data.data.phone;
                gender.value = r.data.data.gender;
                mailProvince.value = r.data.data.mailProvince.toString();
                workPlace.value = r.data.data.workPlace;
                certificateType.value = r.data.data.certificateType;
                graduateSchool.value = r.data.data.graduateSchool;
                certificateNo.value = r.data.data.certificateNo;
                graduateMajor.value = r.data.data.graduateMajor;
                professionalTitle.value = r.data.data.professionalTitle;
                certificateDate.value = r.data.data.certificateDate;
                politicalOutlook.value = r.data.data.politicalOutlook;
                certificateRange.value = r.data.data.certificateRange;
                nation.value = r.data.data.nation;
                email.value = r.data.data.email;
                certificateCategory.value = r.data.data.certificateCategory
                degree.value = r.data.data.degree

                onProvinceChange(areaProvince.value).then(() => {
                  areaCity.value = r.data.data.areaCity.toString();
                  onCityChange(areaCity.value).then(() => {
                    areaDistrict.value = r.data.data.areaDistrict.toString();
                  })
                })
                

                onMailProviceChange(mailProvince.value).then(() => {
                  mailCity.value = r.data.data.mailCity.toString();
                  onMailCityChange(mailCity.value).then(() => {
                    mailDistrict.value = r.data.data.mailDistrict.toString();
                  })
                })
                
              }
            })
        }
        const degree = ref('')
        const certificateCategory = ref('')
        const name = ref('')
        const areaProvince = ref('')
        const areaCity = ref('')
        const areaDistrict = ref('')
        const idcard = ref('')
        const mailAddress = ref('')
        const phone = ref('')
        const gender = ref('')
        const mailProvince = ref('')
        const mailCity = ref('')
        const mailDistrict = ref('')
        const workPlace = ref('')
        const certificateType = ref('')
        const graduateSchool = ref('')
        const certificateNo = ref('')
        const graduateMajor = ref('')
        const professionalTitle = ref('')
        const certificateDate = ref('')
        const politicalOutlook = ref('')
        const certificateRange = ref('')
        const nation = ref('')
        const email = ref('')

        const city = cityJson
        const cities = ref([]);
        const districts = ref([]);

        const onProvinceChange = async (provinceCode) => {
            const province = city.find(p => p.code === provinceCode);
            cities.value = province ? province.children : [];
            areaCity.value = '';
            areaDistrict.value = '';
            districts.value = [];
        };

        const onCityChange = async (cityCode) => {
            const cityObj = cities.value.find(c => c.code === cityCode);
            districts.value = cityObj ? cityObj.children : [];
            areaDistrict.value = '';
        };

        const mailCities = ref([]);
        const mailDistricts = ref([]);

        const onMailProviceChange = async (provinceCode) => {
            const province = city.find(p => p.code === provinceCode);
            mailCities.value = province ? province.children : [];
            mailCity.value = '';
            mailDistrict.value = '';
            mailDistricts.value = [];
        };

        const onMailCityChange = async (cityCode) => {
            const cityObj = mailCities.value.find(c => c.code === cityCode);
            mailDistricts.value = cityObj ? cityObj.children : [];
            mailDistrict.value = '';
        };

        const canSubmit =  () => {
          const requiredFields = [
            { field: name.value, name: '姓名' },
            { field: areaProvince.value, name: '所属城市' },
            { field: areaCity.value, name: '所属城市' },
            { field: areaDistrict.value, name: '所属城市' },
            { field: idcard.value, name: '身份证号' },
            { field: mailProvince.value, name: '通讯城市' },
            { field: mailCity.value, name: '通讯城市' },
            { field: mailDistrict.value, name: '通讯城市' },
            { field: phone.value, name: '手机号' },
            { field: gender.value, name: '性别' },
            { field: workPlace.value, name: '工作单位' },
            { field: certificateType.value, name: '证书类型' },
            { field: graduateSchool.value, name: '毕业院校' },
            { field: certificateNo.value, name: '资格证书' },
            { field: graduateMajor.value, name: '毕业专业' },
            { field: professionalTitle.value, name: '职称' },
            { field: certificateDate.value, name: '批准日期' },
            { field: certificateRange.value, name: '职业范围' },
            { field: degree.value, name: '最高学历' },
            { field: certificateCategory.value, name: '执业类别' },
            
          ];

          // console.log(certificateDate.value, dayjs(certificateDate.value).format('YYYY-MM-DD'))

          for (const field of requiredFields) {
              if (!field.field) {
                  ElMessage({
                      message: `请填写${field.name}`,
                      type: 'error',
                  });
                  return null;
              }
          }

          return {
            name: name.value,
            areaProvince: areaProvince.value,
            areaCity: areaCity.value,
            areaDistrict: areaDistrict.value,
            idcard: idcard.value,
            mailAddress: mailAddress.value,
            phone: phone.value,
            gender: gender.value,
            mailProvince: mailProvince.value,
            mailCity: mailCity.value,
            mailDistrict: mailDistrict.value,
            workPlace: workPlace.value,
            certificateType: certificateType.value,
            graduateSchool: graduateSchool.value,
            certificateNo: certificateNo.value,
            graduateMajor: graduateMajor.value,
            professionalTitle: professionalTitle.value,
            certificateDate: dayjs(certificateDate.value).format('YYYY-MM-DD'),
            politicalOutlook: politicalOutlook.value,
            certificateRange: certificateRange.value,
            nation: nation.value,
            email: email.value,
            degree: degree.value,
            certificateCategory: certificateCategory.value,
            id: id.value,
            areaSummary: `${getName(cityJson, areaProvince.value)}-${getName(cities.value, areaCity.value)}-${getName(districts.value, areaDistrict.value)}`
          }
        }

        const getName = (rows, code) => {
            return rows.find(item => item.code == code).name
        }

        return {
            certificateCategory,
            degree,
            mailCities,
            mailDistricts,
            onMailProviceChange,
            onMailCityChange,
            onProvinceChange,
            onCityChange,
            cities,
            districts,
            city,
            name,
            areaProvince,
            areaCity,
            areaDistrict,
            idcard,
            mailAddress,
            phone,
            gender,
            workPlace,
            certificateType,
            graduateSchool,
            certificateNo,
            graduateMajor,
            professionalTitle,
            certificateDate,
            politicalOutlook,
            certificateRange,
            nation,
            email,
            mailProvince,
            mailCity,
            mailDistrict,
            canSubmit,
            cacheProps
        }
    }
})
</script>

<style>

</style>