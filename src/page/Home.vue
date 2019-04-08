<template>
    <div class="home">
        <div @click.prevent="logout">退出</div>
       <table class="table" border="1" width="90%">

            <tr>
                <th>序号</th>
                <th>名称</th>
                <th>价格</th>
                <th>数量</th>
                <th>总价</th>
                <th>操作</th>
            </tr>

            <tr v-for="(item,index) in goods" :key="index">
                <td>{{item.id}}</td>
                <td>{{item.goodsName}}</td>
                <td>{{item.price}}</td>
                <td>
                    <el-col :span="6">
                        <el-input v-model="item.num" placeholder="请输入数量"></el-input>
                    </el-col>
                </td>
                <td>{{item.totalPrice}}</td>
                <td>
                    <span @click.prevent="del(item.id)">删除</span>
                </td>
            </tr>

        </table>

        <div>
            totalAll:{{totalAll}}
        </div>

        <el-pagination
            background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="[1, 2, 5, 10, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="totalRecored">
            </el-pagination>
    </div>
</template>

<script>
export default {
    name: 'Home',
    computed:{
        goods(){
             return this.$store.getters.goods;
        },
        page(){
            return this.$store.state.goods.page;
        },
        pageSize(){
            return this.$store.state.goods.pageSize;
        },
        totalAll(){
            return this.$store.getters.totalAll;
        },
        totalRecored(){
            return this.$store.state.goods.total;
        }
    },
    mounted(){
        this.gData();
    },
    methods:{
        gData(){
            tool.patch('loadData');
        },
        handleSizeChange(val) {
            console.log(`perpage ${val} 条`);

            tool.patch('loadData', {page: this.$store.state.goods.page, pageSize: val});
        },
        handleCurrentChange(val) {
            console.log(`curpage: ${val}`);

            tool.patch('loadData', {page: val, pageSize: this.$store.state.goods.pageSize});
        },
        del(id){
            //console.log(id);
            this.$store.commit('del', {id});
        },
        logout(){
            tool.auth.logout();
        }
    },
    data(){
        return {
            
        }
    }
}
</script>

<style>
  .home{
      width:90%;
      margin: 50px auto;
  }
  .el-table .warning-row {
    background: oldlace;
  }

  .el-table .success-row {
    background: #f0f9eb;
  }
</style>
