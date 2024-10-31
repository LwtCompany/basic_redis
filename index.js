import {Storage} from "./storage.js";
class Db{
     static storage = new Storage('memory.txt')
     #storeService;
     #hash;
     constructor(Storage) {
         this.#storeService = Storage;
         this.#hash = this.#storeService.readStorage();

         // this.#randomExpire()
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
        this.#storeService.updateStorage(this.#hash);
        return hash;
    }
     get(key){

        const hash = this.hashing(key);
        const item =  this.#hash[hash];

        const currentTime = new Date().getTime();

        if(item && currentTime <= item?.duration){
            return item
        }else{
            this.delete(key);
            console.log(`Sorry you have not this element by key ${key}`)
        }
    }
     delete(key){
        const hash = this.hashing(key);
        const deleted = this.#hash.splice(hash, 1);
        this.#storeService.updateStorage(this.#hash);

        return deleted;
     }
     get view(){
        let values ='';
        for(let i in this.#hash){
          if (this.#hash[i] && typeof this.#hash[i] === 'object' && !Array.isArray(this.#hash[i])){
                  values +=`${i} = `+ JSON.stringify(this.#hash[i])+"\n";
          }

        }

        let response = values.length > 0 ? values : 'your memory is empty!';
        console.log(response);
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

const storage = Db.storage;
const db = new Db(storage);

db.view;

// db.add({key: 'xurshid1', val: {name: 'xurshid1', age:'26', height: 185}});
// db.add({key: 'xurshid2', val: {name: 'xurshid2', age:'26', height: 185}});
// db.add({key: 'xurshid3', val: {name: 'xurshid3', age:'26', height: 185}});
// db.add({key: 'xurshid4', val: {name: 'xurshid4', age:'26', height: 185}});
// db.add({key: 'xurshid5', val: {name: 'xurshid5', age:'26', height: 185}});
// db.add({key: 'xurshid6', val: {name: 'xurshid6', age:'26', height: 185}});
// console.log(db.get('xurshid'));







