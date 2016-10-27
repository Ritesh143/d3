var readline=require('readline');
var file=require('fs');
var myfile='./../csv/Indicators.csv';
var rl=readline.createInterface({
input:file.createReadStream(myfile),
});
var birthRate = [];
var deathRate = [];
var year=[];

function output(year,birthRate,deathRate) {
   this.year = year;
   this.birthRate = birthRate;
   this.deathRate = deathRate;
}

var indicator_code=["SP.DYN.CBRT.IN","SP.DYN.CDRT.IN"];
var content;
var count=0;
var countBirth=0;
var countDeath=0;
var final=[];
rl.on('line',function (koi)
{
	if(count==0)
	{
		content=koi.toString().split(",");
		count++;
	}
	else
	{
		var first_row=koi.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
		if("IND"==first_row[1].toString()&&indicator_code[0]==first_row[3].toString())
		{
			
			birthRate[countBirth]=parseFloat(first_row[5]);
			// console.log(birthRate[countBirth]+"  "+countBirth);
			countBirth++;
		}
		else if ("IND"==first_row[1]&&indicator_code[1]==first_row[3])
		{
			deathRate[countDeath]=parseFloat(first_row[5]);
			countDeath++;
		}
	}
	
});

rl.on('close',function () 
{
	for (var i = 1960; i < 2016; i++) {
		year.push(i.toString());
	}
	for(var key in  deathRate)
	{
		var json=new output(year[key],deathRate[key],birthRate[key]);
		final.push(json);
	}
	file.writeFile('./../json/jsonMultiSeries.json',JSON.stringify(final),'utf-8');
});