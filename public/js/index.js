
let lorem = Vue.component('lorem', {
    template: '#lorem',
    props: ['img'],
    methods: {
        initCanvas(){
            let canvas = document.createElement('canvas')
            canvas.height = window.innerHeight
            canvas.width = window.innerWidth
            this.$el.appendChild(canvas)
            
            new p5(this.setup)
        },
        reload(){
            //
        },
        setup(p5){
            var speed = 2;    
            var posX = 0;
            
            // NOTE: Set up is here   
            p5.setup = _ => {      
                p5.createCanvas(500, 500);      
                p5.ellipse(p5.width / 2, p5.height / 2, 500, 500);    
            }     
            // NOTE: Draw is here
            p5.draw = _ => {      
                p5.background(0);
                const degree = p5.frameCount * 3;      
                const y = p5.sin(p5.radians(degree)) * 50;
                
                p5.push();
                p5.translate(0, p5.height / 2);
                p5.ellipse(posX, y, 50, 50);
                p5.pop();
                posX += speed;
                    
                if (posX > p5.width || posX < 0) {    
                    speed *= -1;      
                }
            }

        },
        draw(){
            
        }
    },
    mounted(){
        this.initCanvas()
        window.addEventListener('resize', ()=>{
            this.reload()
        })
    }
})

var app = new Vue({
    el: '#app',
    data(){
        return {
            message: 'lorem ipsum',
            img: null,
        }
    },
    methods: {
        initImg(){
            let img = document.head.querySelector(`meta[name='image']`).content
            if(img){
                this.img = img
            }
        }
    },
    created(){
        this.initImg()
    }
})
