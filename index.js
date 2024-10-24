class Db{
     #hash = new Array(1333);
     constructor() {
         this.#randomExpire()
     }
     hashing(str){
            let hash = 5381;
            let char;

            for (let i = 0; i < str.length; i++) {
                char = str.charCodeAt(i);
                hash = (hash << 5) + hash + char;
            }

            return (hash >>> 0) % 1333;
    }
     add({key, val, exp = 10000}){
        const duration = new Date().getTime() + exp;
        const hash = this.hashing(key);
        val.duration = duration;
        this.#hash[hash] = val;
        return hash;
    }
     get(key){
        const hash = this.hashing(key);
        const item =  this.#hash[hash];
         const currentTime = new Date().getTime();
        if(item && currentTime <= item?.duration){
            return item
        }
        console.log(`Sorry you have not this element by key ${key}`)
    }
     delete(key){
        const hash = this.hashing(key);
        return this.#hash.splice(hash, 1);
     }
     get view(){
        let values ='';
        for(let i in this.#hash){
            values += JSON.stringify(this.#hash[i]);
        }
         console.log(values)
     }
     #setExpire(exp, key){
         new Promise((resolve, reject) => {
            setTimeout(() => {
                this.delete(key);
                resolve();
            }, exp);
        }).then(() => {
            console.log(`Entry for ${key} expired after ${exp}ms.`);
        }).catch((err) => {
            console.error(err);
        });
     }

     #randomExpire(){
         const index = parseInt(Math.random() * (this.#hash.length -1));
         const hash = this.#hash[index];
         const currentTime = new Date().getTime();
        if(hash && currentTime > hash?.duration){
            this.#hash.splice(index, 1);
        }
     }
}


const db = new Db();
const first = db.add({key: 'Jamshid', val: {name: 'Jamshid', age:23, height:176}, exp: 14000});
const second = db.add({key: 'Rasul', val: {name: 'Rasul', age:26, height:183}});

// console.log(first);
// console.log(db.get('Jamshid'));
// console.log(db.get('Rasul'));
// // db.delete('Jamshid')
// console.log(db.get('Jamshid'));
// // //
// db.view;






