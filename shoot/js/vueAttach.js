var vueAttach=vueAttach||{}
vueAttach.progress=new Vue({
    el:"#progress-bar",
    data:{
        styleObject: {
            display:'none',
            width:"100%"
          }
    },
    methods:{
    }
});

vueAttach.life=new Vue({
    el:"#life",
    data:{
        life:100000,
        styleObject: {
            'font-size':'20px'
          }
    },
    methods:{
    }
});

vueAttach.score=new Vue({
    el:"#score",
    data:{
        score:0,
        styleObject: {
            'font-size':'20px'
          }
    },
    methods:{
    }
});

vueAttach.skillPoint=new Vue({
    el:"#skillPoint",
    data:{
        skillPoint:100000,
        styleObject: {
            'font-size':'20px'
          }
    },
    methods:{
    }
});

vueAttach.skill=new Vue({
    el:"#skillSet",
    data:{
        skill1:'空',
        skill2:'空',
        skill3:'空',
        styleObject: {
            'font-size':'20px',
            'width': '30px',
            'text-align':'center'
          }
    },
    methods:{
    }
});

vueAttach.passive=new Vue({
    el:"#passiveSet",
    data:{
        passive1:'牧歌灵能机关枪',
        passive2:'空',
        passive3:'空',
        passive4:'空',
        styleObject: {
            'font-size':'20px',
            'width': '30px',
            'text-align':'center'
          }
    },
    methods:{
    }
});