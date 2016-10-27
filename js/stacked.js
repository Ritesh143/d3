var readline=require('readline');
var file=require('fs');
var myfile='./csv/Indicators.csv';
var rl=readline.createInterface({
input:file.createReadStream(myfile),
});

var mapFemaleValue = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                      "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,    "PRK":0,
                      "OMN":0,"PAK":0,"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,    "TKM":0,"ARE":0,
                      "UZB":0,"VNM":0,"YEM":0};

var mapMaleValue = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                   "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,    "PRK":0,
                   "OMN":0,"PAK":0,"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,    "TKM":0,"ARE":0,
                   "UZB":0,"VNM":0,"YEM":0};

var mapFemaleCount = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                      "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,    "PRK":0,
                      "OMN":0,"PAK":0,"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,    "TKM":0,"ARE":0,
                      "UZB":0,"VNM":0,"YEM":0};

var mapMaleCount = {"AFG":0,"ARM":0,"AZE":0,"BHR":0,"BGD":0,"BTN":0,"BRN":0,"KHM":0,"CHN":0,"GEO":0,"HKG":0,"IND":0,"IDN":0,"IRN":0,"IRQ":0,
                   "ISR":0,"JPN":0,"JOR":0,"KAZ":0,"KWT":0,"KGZ":0,"LAO":0,"LBN":0,"MAC":0,"MYS":0,"MDV":0,"MNG":0,"MMR":0,"NPL":0,    "PRK":0,
                   "OMN":0,"PAK":0,"PHL":0,"QAT":0,"SAU":0,"SGP":0,"KOR":0,"LKA":0,"SYR":0,"TWN":0,"TJK":0,"THA":0,"TUR":0,    "TKM":0,"ARE":0,
                   "UZB":0,"VNM":0,"YEM":0};

var country_code=["AFG","ARM","AZE","BHR","BGD","BTN","BRN","KHM","CHN","GEO","HKG","IND","IDN","IRN","IRQ",
                 "ISR","JPN","JOR","KAZ","KWT","KGZ","LAO","LBN","MAC","MYS","MDV","MNG","MMR","NPL","PRK",
                     "OMN","PAK","PHL","QAT","SAU","SGP","KOR","LKA","SYR","TWN","TJK","THA","TUR","TKM","ARE",
                       "UZB","VNM","YEM"];

function output(countrycode, maleAvg, femaleAvg) {
   this.countryCode = countrycode;
   this.male = maleAvg;
   this.female = femaleAvg;
}

var indicator_code=["SP.DYN.LE00.FE.IN","SP.DYN.LE00.MA.IN"];

var content;
var count=0;
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

		// if((count==3549)||(count==27288))
		// {
			var first_row=koi.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g);
			for (var i = 0; i < country_code.length; i++) 
			{
				if(country_code[i]==first_row[1].toString()&&indicator_code[0]==first_row[3].toString())
				{
					mapFemaleCount[first_row[1]]++;
					mapFemaleValue[first_row[1]]+=parseFloat(first_row[5]);
					// console.log(mapFemaleValue[first_row[1]]);
				}
				else if (country_code[i]==first_row[1]&&indicator_code[1]==first_row[3])
				{
					mapMaleCount[first_row[1]]++;
					mapMaleValue[first_row[1]]+=parseFloat(first_row[5]);
					
				}
			}
			
		// }
		// count++;
	}
});



rl.on('close',function () 
{
	for(var j=0;j< country_code.length;j++)
{
	mapFemaleValue[country_code[j]]=mapFemaleValue[country_code[j]]/mapFemaleCount[country_code[j]];
	mapMaleValue[country_code[j]]=mapMaleValue[country_code[j]]/mapMaleCount[country_code[j]];
}
	for(var key in  mapMaleValue)
	{
		var json=new output(key,mapMaleValue[key],mapFemaleValue[key]);
		final.push(json);
	}
file.writeFile('./json/jsonstacked.json',JSON.stringify(final),'utf-8');
});