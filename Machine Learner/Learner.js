
var current
var target
var feats


function setUp()
{

 


	 target =[
		[0],
		[0],
		[-500],
		[-500],
		[500],
		[500],
		[250],
		[0],
		[0],
		[-500],
		[-500],
		[500],
		[500],
		[250],
		[0],
		[0],
		[-500],
		[-500],
		[500],
		[500],
		[250],
		[0],
		[0],
		[-500],
		[-500],
		[500],
		[500],
		[250]
		
	]
	 feats =[
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	150,
	150,
	150,
	150,
	150,
	1
	],
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	150,
	150,
	150,
	150,
	150,
	1
	],
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	150,
	150,
	150,
	150,
	150,
	1
	]
	,[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	200,
	200,
	200,
	200,
	200,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	300,
	300,
	300,
	300,
	300,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	100,
	100,
	100,
	100,
	100,
	1
	],
	[
	150,
	150,
	150,
	150,
	150,
	1
	]
]


	

 
//console.log(month_score.profit)
}


function normalizeData(data,score)
{
	mue = 0
	stand = 0
	feats_col= data[0].length-1
	feats_rows =data.length
	score_col= score[0].length-1
	score_rows =score.length
	mean_array=[]

	std = [mean_array.length]
	
	for(var col = 0;col<feats_col;col++)
	{
		mean = 0.0;
		for(var row =0;row<feats_rows;row++){
			mean+=data[row][col]
		}
		mean=mean/feats_rows;
		mean_array[col]=mean

	}
	
	for(var col = 0;col<feats_col;col++)
	{
		err = 0.0;
		for(var row = 0;row<feats_rows;row++){
			err+=Math.pow(mean_array[col]-data[row][col],2)
		}
		err=Math.sqrt(err/feats_rows);
		std[col]=err

	}
	
	

	for(var col = 0;col<feats_col;col++)
	{
		for(var row =0;row<feats_rows;row++){
			prev = data[row][col]
			mu= mean_array[col]
			st = std[col]
			data[row][col] = (prev-mu)/st
		}
		
	}

	for(var col = 0;col<score_col;col++)
	{
		for(var row =0;row<score_rows;row++){
			prev = score[row][col]
			mu= mean_array[col]
			st = std[col]
			score[row][col] = (prev-mu)/st
		}
	}
	for(var e = 0;e<mean_array.length;e++)
	{
		mue += mean_array[e]
		stand+= std[e]

	}
	mue = mue/mean_array.length
	stand = stand/std.length
	

	
}
function linearregesssion(score)
{
	// use ml_func from mongoDB
alpha = .001
//console.log(knnRegression(2,feats,score,target))
	
normalizeData(feats,score)
ml_func = {
	food:.035,
	bills: .025,
	transportation:.035,
	entertainment:.035,
	custom:.075
}
weight = [
	ml_func.food,
	ml_func.bills,
	ml_func.transportation,
	ml_func.entertainment,
	ml_func.custom,
	1
	]

	// update weights
	for(var i = 0;i<feats.length;i++)
	{
		profit = 
		weight[0]*feats[i][0]+
		weight[1]*feats[i][1]+
		weight[2]*feats[i][2]+
		weight[3]*feats[i][3]+
		weight[4]*feats[i][4]+
		weight[5]* feats[i][5]
		
		
		


		weight[0] += alpha *(target[i][0]-profit)*feats[i][0]
		weight[1] += alpha *(target[i][0]-profit)*feats[i][1]
		weight[2] += alpha *(target[i][0]-profit)*feats[i][2]
		weight[3] += alpha *(target[i][0]-profit)*feats[i][3]
		weight[4] += alpha *(target[i][0]-profit)*feats[i][4]
		weight[5] += alpha *(target[i][0]-profit)*feats[i][5]
	}
	
	
	
	 profit = 
		weight[0]*score[0][0]+
		weight[1]*score[0][1]+
		weight[2]*score[0][2]+
		weight[3]*score[0][3]+
		weight[4]*score[0][4]+
		weight[5]*score[0][5]
	
return (profit*stand)+mu
	


}

function knnRegression(K,data,score,target)
{
	var prediction =0.0;
	var closness = [data.length]
	var neighbor = [K]
	

	for(var row =0;row<data.length;row++)
	{
		close=0.0
		for (var col=0;col<data[0].length;col++)
		{
			close+=Math.abs(data[row][col]-score[0][col])
		}
		closness[row]=close
	}
	for(var t = 0;t<K;t++)
	{
		min=99999
		index=0;
		for(var r= 0;r<closness.length;r++)
		{
			if(min>closness[r])
			{
				min=closness[r]
				index=r
			}
		}
		neighbor[t] =index
		closness[index]= 99999

	}

	for(var z = 0;z<neighbor.length;z++)
	{

		prediction+=target[neighbor[z]][0]
		
	}

	return prediction/K
	
	
}
function setupANDpredict()
{
	// gather the existing data and predict
	setUp() // simulates pulling from the databasee and structures the data
	console.log("Knn Regression Prediction: "+knnRegression(2,feats,current,target))
	console.log("Liner Regression Prediction: "+linearregesssion(current))
}
function setCurrentScore()
{
	// should get all the transactions from the current date until the begining of the month
	current=

	[
		[
		300,
		300,
		200,
		100,
		0,
		1
		]
	]
}
function setPastScore(months)
{

	start_date = new Date()
	start_date.setDate(1)
	MonthlyTransactions = [9]
	
	dates= [8]
	for (var s =0;s<months;s++)
	{
		

		end_date = new Date(start_date)
		end_date.setMonth(end_date.getMonth()-1)

		start = start_date.getFullYear()+"-"+(start_date.getMonth()+1)+"-"+start_date.getDate()
		end = end_date.getFullYear()+"-"+(end_date.getMonth()+1)+"-"+end_date.getDate()
		console.log(start+" thru "+end)

		/*ciient.getTransactions(accessYoken,end,start,{
			count :250,
			offset: 0,
		},(err,result)=>{
			// Handle error
			MonthlyTransactions[s]= results.Transactions
		
		})*/
		// dummy data
		transactions = [
			{"amount":150,"category":"food"},
			{"amount":50,"category":"bills"},
			{"amount":15,"category":"entertainment"},
			{"amount":158,"category":"travel"},
			{"amount":250,"category":"custom"},

			{"amount":150,"category":"bills"},
			{"amount":50,"category":"food"},
			{"amount":15,"category":"travel"},
			{"amount":158,"category":"custom"},
			{"amount":250,"category":"custom"},

			{"amount":150,"category":"custom"},
			{"amount":50,"category":"travel"},
			{"amount":15,"category":"entertainment"},
			{"amount":158,"category":"travel"},
			{"amount":250,"category":"bills"}
		]
		MonthlyTransactions[s] = transactions
		
		start_date = new Date(end_date)
	}

	MonthlyTransactions.forEach(transList => {
		// the weight of the monthlt budget transactions  database
		food =0
		bills=0
		entertainment=0
		travel=0
		custom=0
		profit= 0
		income = 4605.67 // dummy data
		/*clientInformation.getIncome(accessToken,function(err,result){
			//handle err
			income = result.income
		})*/
		transList.forEach(trans =>
			{
				switch (trans.category)
				{
					case "food":
						food+=trans.amount
						break

					case "bills":
						bills+=trans.amount
						break

					case "entertainment":
						entertainment+=trans.amount
						break

					case "travel":
						travel+=trans.amount
						break
					case "custom":
						custom+=trans.amount
						break

				}
			})
			profit = income - (food+bills+travel+custom+entertainment)
			// create monthly budget and add it to the data base
		console.log(profit)
		
	});




	
	
	
}

function init ()
{
	// Check if user data has been created 
	userISreal= true // some expression to see if the user really exist
	setCurrentScore() // set current score
	if (userISreal)
	{
		// get date from user
		last_Update = new Date()
		last_Update.setMonth(last_Update.getMonth()-2)
		// dummy data above

		today = new Date()
		updateIsneeded = today.getMonth()> last_Update.getMonth()
		 console.log(updateIsneeded)
		if(updateIsneeded)setPastScore(1)
		setupANDpredict()
	 }
	  // user existed and has stuff in data base
	else{
		// get past  6 months transaction and push it to the monthly budget database
		setPastScore(6)//setupANDpredict()
	}
}

init()
