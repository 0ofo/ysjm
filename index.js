let rely = []
let verify = '0'
const deep = 12
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
            for (const i of this.list) {
                myData.push(i.v%4)
                rely.push(i.rely.split(' ').map((value)=>{
                    return parseInt(value)-1
                }))
            }
            verify = '0'.repeat(myData.length)
            let res = recursion([{n:'',list:myData}])
            this.res = res.n.split('').map(v=>{
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
function recursion(ways){
    if (ways[0].n.length>deep) return null
    let myWays = []
    for (const w in ways) {
        if (ways[w].list.join('')==verify) return ways[w]
        for (const i in ways[0].list) {
            myWays.push({
                n: ways[w].n + i,
                list: hit(ways[w].list, i)
            })
        }
    }
    return recursion(myWays)
}
