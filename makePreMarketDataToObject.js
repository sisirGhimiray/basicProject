const fs=require("fs");

const pmdo=function(raw_strn){
        let word_want_to_rem="</a>";
        let reg=new RegExp(word_want_to_rem,"g")

        let repUnwnChr=raw_strn.replace(reg,"");
        
        let spl_raw_str=repUnwnChr.split("</td>");
        
         return spl_raw_str;
        
        
        }
        
        
        exports.make_obj_of_premarketData=function(raw_str,dt=new Date()){
        
        
            let a=pmdo(raw_str);
        
            let len=a.length;
            let buck=[];
            let bucket=[];
            let i=0;
            while(i<len){
                
                let idx=a[i].lastIndexOf('>');
                let wntStr=a[i].substring(idx+1);
            
                buck.push(wntStr);
                i++;
            }
            
            // console.log(buck.slice(0,100));
            
            for(let i=0;i<buck.length;i++){
            
            if(buck[i]===""){
                continue;
            }else if(buck[i]!=""){
            
             let obj=   {
                    symbol: buck[i],
                    previousClose:buck[i+1].includes(',')?buck[i+1].replaceAll(",",""):buck[i+1],
                    indicativeEquilibriumPrice:buck[i+2].includes(',')?buck[i+2].replaceAll(",",""):buck[i+2],
                    change: buck[i+3].includes(',')?buck[i+3].replaceAll(",",""):buck[i+3],
                    percentageChange: buck[i+4],
                    final: (function(){
                        if(buck[i+5].includes(',')){
                            return buck[i+5].replaceAll(',','');
                        }else if(buck[i+5]==='-'){
                            return 0;
                        }else{
                            return buck[i+5];
                        }
                    })(),
                    finalQuantity: buck[i+6].includes(',')?buck[i+6].replaceAll(",",""):buck[i+6],
                    finalQuantity: (function(){
                        if(buck[i+6].includes(',')){
                            return buck[i+6].replaceAll(',','');
                        }else if(buck[i+6]==='-'){
                            return 0;
                        }else{
                            return buck[i+6];
                        }
                    })(),

                
                    value: (function(){
                        if(buck[i+7].includes(',')){
                            return buck[i+7].replaceAll(',','');
                        }else if(buck[i+7]==='-'){
                            return 0;
                        }else{
                            return buck[i+7];
                        }
                    })(),
                    normalMarket52WeekHigh: (function(){
                        if(buck[i+8].includes(',')){
                            return buck[i+8].replaceAll(',','');
                        }else if(buck[i+8]==='-'){
                            return 0;
                        }else{
                            return buck[i+8];
                        }
                    })(),
                    normalMarket52WeekLow: (function(){
                        if(buck[i+9].includes(',')){
                            return buck[i+9].replaceAll(',','');
                        }else if(buck[i+9]==='-'){
                            return 0;
                        }else{
                            return buck[i+9];
                        }
                    })(),
                    date:dt,
                
                }
                bucket.push(obj);
                i=i+10;
            }
            
        
            }
        
        
        
        
            return bucket;
            
        }





// let file=fs.readFile('./preDataRead.txt',(err,data)=>{
//     console.log(data);
//     if(err)
//     console.log(err);
// });

let file1=fs.readFileSync('./preDataRead.txt',{'encoding':'utf-8'});

let objData=this.make_obj_of_premarketData(file1);

let jsonData=JSON.stringify(objData);

let writeObjTofile=fs.writeFileSync("./preDataWrite.json",jsonData,{encoding:'utf-8'});