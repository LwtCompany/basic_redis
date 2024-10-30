import fs from 'fs';

export class Storage {
    file;
    constructor(fileName) {
        this.file = fileName;
        this.checkOrCreateStorage(fileName);
    }

    checkOrCreateStorage(name) {
         const fileName = name ?? this.file;
             fs.access(fileName, (err, data) => {
                 if (err?.code === 'ENOENT') {
                     fs.appendFile(fileName,'',(err, data) => {
                         if (err) {
                             console.error(err);
                         }
                     });
                 }

             });
    }

     readStorage(name=null) {
        const fileName = name ?? this.file;

        const data = fs.readFileSync(fileName, "utf-8", (err, data) => {
            if (err) {
                throw err;
            }
            return data;
        });
      return data ? JSON.parse(data) : [];
    }

    updateStorage(data = [], name=null) {
        const fileName = name ?? this.file;
        fs.writeFileSync(fileName, JSON.stringify(data, null, 2), 'utf-8', (err, data) => {
            if (err) {
                console.error(err);
            }else {
                console.log('data updated');
            }
        });
    }
}

// const storage = new Storage('memory.txt');
//
// const newEntry = { key: 'example', value: 'newValue' };
// const data = storage.readStorage();
// data.push(newEntry);
// storage.updateStorage(data);
// // console.log(storage.readStorage('memory.txt'));
