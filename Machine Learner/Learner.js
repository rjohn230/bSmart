var mue = 0
var stand = 0
var current=

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
var ml_func = {
		food:.035,
		bills: .025,
		transportation:.035,
		entertainment:.035,
		custom:.075
	}

	var target =[
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
	var feats =[
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


	var weight = [
	ml_func.food,
	ml_func.bills,
	ml_func.transportation,
	ml_func.entertainment,
	ml_func.custom,
	1
	]

var alpha = .001
//console.log(month_score.profit)

function userDatacrete() {
	//create file  
}
function updateData(score)
{
	// add score to txt file
	// push updated function to mongoDB
}
function normalizeData(data,score)
{
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
	
//console.log(knnRegression(2,feats,score,target))
	
normalizeData(feats,score)


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
console.log("knnRegression:"+knnRegression(2,feats,current,target))
console.log("Linear Regression:"+linearregesssion(current))
