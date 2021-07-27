let rely = [[0,2], [0, 1, 2], [0, 2, 4], [2, 3, 4], [3, 4]]
let data = [0, 0, 0, 3, 0]
let verify = '0'.repeat(data.length)
let deep = data.length
Vue.createApp({
    data() {
        return {
            list:[],
            rely:[],
            res:[],
            select:'',
            demo:{
                "荒海方形4个":[
                    {v:0,rely:'1 2 3'},
                    {v:0,rely:'1 2 4'},
                    {v:0,rely:'1 3'},
                    {v:0,rely:'2 3 4'},
                ],
                "荒海一排5个":[
                    {v:0,rely:'1 3'},
                    {v:0,rely:'1 2 3'},
                    {v:0,rely:'1 3 5'},
                    {v:0,rely:'3 4 5'},
                    {v:0,rely:'4 5'}
                ],
                "荒海树根后":[
                    {v:2,rely:'1 2'},
                    {v:0,rely:'1 2 3'},
                    {v:2,rely:'1 3'},
                ]
            }
        }
    },
    methods:{
        add(){
            this.list.push({v:0,rely:''})
        },
        remove(){
            this.list.pop();
        },
        change(i){
            this.list[i].v++
        },
        compute(){
            let myData = []
            rely = []
            data=[]
            for (const i of this.list) {
                myData.push(i.v%4)
                rely.push(i.rely.split(' ').map((value)=>{
                    return parseInt(value)-1
                }))
            }
            verify = '0'.repeat(myData.length)
            deep = myData.length+1
            let res = recursion(myData).split('')
            this.res = res.map(v=>{
                return parseInt(v)+1
            })
        }
    },
    watch:{
        select(v){
            this.list=this.demo[v]
        }
    }
}).mount('#app')

function hit(data,i) {
    let myData=[]
    for (const k of data){
        myData.push(k)
    }
    for (const k of rely[i]) {
        if (myData[k]==3){
            myData[k]=0
        }else {
            myData[k]++
        }
    }
    return myData
}
function recursion(data, n=''){
    if (n.length>deep) return null
    console.log(n,data)
    if (data.join('')==verify){
        return n
    }
    for (const key in data) {
        const r = recursion(hit(data,key),n+key)
        if (r!=null || r!=undefined){
            return r
        }
    }
}
