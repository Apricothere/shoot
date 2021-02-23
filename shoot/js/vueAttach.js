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

vueAttach.skill=new Vue({
    el:"#skillSet",
    data:{
        skill:['shizuka','空','空'],
        styleObject: {
            'font-size':'20px'
          }
    },
    methods:{
    }
});