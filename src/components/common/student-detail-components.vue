<template>
    <div>
        <el-form ref="form" label-width="120px">
          <el-row :gutter="20">
            <el-col :span="11">
              <el-form-item label="姓名" required>
                <el-input v-model="name" placeholder="请输入姓名"></el-input>
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
              <el-form-item label="身份证号" required>
                <el-input v-model="idcard" placeholder="请输入身份证号"></el-input>
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
              <el-form-item label="手机号" required>
                <el-input v-model="phone" placeholder="请输入手机号"></el-input>
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
              <el-form-item label="性别" required>
                <el-select v-model="gender" placeholder="请选择">
                  <el-option label="男" :value="1"></el-option>
                  <el-option label="女" :value="2"></el-option>
                </el-select>
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
              <el-form-item label="证书类型" required>
                <el-select v-model="certificateType" placeholder="请选择">
                  <el-option label="执业药师" :value="1"></el-option>
                  <el-option label="从业药师" :value="2"></el-option>
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
              <el-form-item label="资格证书" required>
                <el-input v-model="certificateNo" placeholder="请输入资格证书"></el-input>
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
              <el-form-item label="">
                <div style="font-size: 12px; font-weight: 400; color: rgba(255, 87, 51, 1); line-height: 16.8px;">
                  2017年前通过的填写资格证书号，17年及以后的填写管理号
                </div>
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
              <el-form-item label="批准日期" required>
                <el-date-picker style="width:100%" v-model="certificateDate" type="date" placeholder="请输入日期"></el-date-picker>
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
import cityJson from '@/assets/citylist.json'

export default defineComponent({
    name: "StudentDetailComponet",
    setup() {
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

        const onProvinceChange = (provinceCode) => {
            const province = city.find(p => p.code === provinceCode);
            cities.value = province ? province.children : [];
            areaCity.value = '';
            areaDistrict.value = '';
            districts.value = [];
        };

        const onCityChange = (cityCode) => {
            const cityObj = cities.value.find(c => c.code === cityCode);
            districts.value = cityObj ? cityObj.children : [];
            areaDistrict.value = '';
        };

        const mailCities = ref([]);
        const mailDistricts = ref([]);

        const onMailProviceChange = (provinceCode) => {
            const province = city.find(p => p.code === provinceCode);
            mailCities.value = province ? province.children : [];
            mailCity.value = '';
            mailDistrict.value = '';
            mailDistricts.value = [];
        };

        const onMailCityChange = (cityCode) => {
            const cityObj = mailCities.value.find(c => c.code === cityCode);
            mailDistricts.value = cityObj ? cityObj.children : [];
            mailDistrict.value = '';
        };

        return {
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
        }
    }
})
</script>

<style>

</style>