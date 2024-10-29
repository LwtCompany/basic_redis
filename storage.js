import fs from 'fs';
export class Storage {
    file;
    constructor(fileName) {
        this.file = fileName;
        this.checkOrCreateStorage(fileName);
    }

    checkOrCreateStorage(name) {
             fs.access(this.file, (err, data) => {
                 if (err?.code === 'ENOENT') {
                     const data = new Array(1333).join(",");
                     fs.appendFile(name, data, (err, data) => {
                         if (err) {
                             console.log(`Error: while creating file ${err}`);
                         }
                     });
                 }

             });
    }

     readStorage(name=null) {
        const fileName = name ?? this.file;

        return  fs.readFileSync(fileName, "utf-8", (err, data) => {
            if (err) {
                throw err;
            }
            return data;
        });

    }

    updateStorage(data = [], name=null) {
         const fileName = name ?? this.file;
        fs.writeFileSync(fileName, data, (err, data) => {
            if (err) {
                throw err;
            }else{
                console.log('Storage updated');
            }
        });
    }
}

const storage = new Storage('memory.txt');
