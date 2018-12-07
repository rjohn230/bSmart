'use strict';

var util = require('util');

var express = require('express');
var bodyParser = require('body-parser');
var moment = require('moment');
var plaid = require('plaid');

var APP_PORT =3000
var PLAID_CLIENT_ID = '5ba9401007df5000124dcc33' 
var PLAID_SECRET ='8a045cc9c83c4e0bc170d79bf24481' 
var PLAID_PUBLIC_KEY ='4c47b9e9962c5b6ec123001fcab399' 
var PLAID_ENV = 'sandbox'
// We store the access_token in memory - in production, store it in a secure
// persistent data store
var ACCESS_TOKEN = null;
var PUBLIC_TOKEN = null;
var ITEM_ID = null;
var months_counter = 1
var startDate = moment().subtract(30*months_counter, 'days').format('YYYY-MM-DD');
var endDate = moment().subtract(30*(months_counter-1), 'days').format('YYYY-MM-DD');
var	MonthlyTransactions = []
var trans
  

var client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV],
  {version: '2018-05-22'}
);

var app = express();
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());



var current=[]
var target =[]
var feats =[]
var category_folders =[]
var categories =[]
var trans
var MonthlyTransactions=[]
var months_counter
var startDate
var endDate
var Knn
var prediction_lin
var salary = 0
var mue 
var stand
var alpha =.001

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
	var feats_col= data[0].length-1
	var feats_rows =data.length
	var score_col= score[0].length-1
	var score_rows =score.length
	var mean_array=[]

	var std = [mean_array.length]
	
	for(var col = 0;col<feats_col;col++)
	{
		var mean = 0.0;
		for(var row =0;row<feats_rows;row++){
			mean+=data[row][col]
		}
		mean=mean/feats_rows;
		mean_array[col]=mean

	}
	
	
	for(var col = 0;col<feats_col;col++)
	{
		var err = 0.0;
		for(var row = 0;row<feats_rows;row++){
			err+=Math.pow(mean_array[col]-data[row][col],2)
		}
		err=Math.sqrt(err/feats_rows);
		std[col]=err

	}
	
	
	
	for(var col = 0;col<feats_col;col++)
	{
		for(var row =0;row<feats_rows;row++){
			var prev = data[row][col]
			var mu= mean_array[col]
			var st = std[col]		
			if(mu!=0)data[row][col] = (prev-st)/mu
		}
		
	}
	
	

	for(var col = 0;col<score_col;col++)
	{
		for(var row =0;row<score_rows;row++){
			var prev = score[row][col]
			var mu= mean_array[col]
			var st = std[col]
			if(mu!=0)score[col] = (prev-st)/mu
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

 var weight = new Array(current.length)
 for(var g=0;g<category_folders.length;g++)
			{
								weight[g]=Math.random()
			}
	weight[category_folders.length]= 1
	var profit =0

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
		weight[0]*score[0]+
		weight[1]*score[1]+
		weight[2]*score[2]+
		weight[3]*score[3]+
		weight[4]*score[4]+
		weight[5]*score[5]
	
return profit/mue*2
	


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
	//console.log("Knn Regression Prediction: "+knnRegression(2,feats,current,target))
	//console.log("Liner Regression Prediction: "+linearregesssion(current))
	predicts = [knnRegression(2,feats,current,target),linearregesssion(current)]
	console.log(predicts)
	return predicts

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
function setPredictions(months,req,res,next)
{
 
  
  
	
	for (var s =0;s<months;s++)
	{
		
     client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 250,
      offset: 0,
    }, function(error, transactionsResponse) {
      if (error != null) {
        console.log(error)
      } else {
				//prettyPrintResponse(transactionsResponse);
				months_counter++
				startDate = moment().subtract(30*months_counter, 'days').format('YYYY-MM-DD');
    		endDate = moment().subtract(30*(months_counter-1), 'days').format('YYYY-MM-DD');
				trans = transactionsResponse.transactions
				
				for(var s= 0; s<12;s++)
				{
					MonthlyTransactions.push(trans)
				}

				client.getCategories(function(err,response){
				categories = response.categories
				
				for(var x =0 ;x<categories.length;x++)
					{
							var category_name = categories[x].hierarchy[0]
						  if(!category_folders.includes(category_name))
							{
								category_folders.push(category_name)
							}
					}
				
					client.getIncome(ACCESS_TOKEN,function(err,result){
						var yearly_salary = result.income.projected_yearly_income

						salary = (yearly_salary*6)/2.5

					
						for(var r =0;r<MonthlyTransactions.length;r++)
						{
							var row_data =new Array(category_folders.length+1)
							current =new Array(category_folders.length+1)
							for(var g=0;g<category_folders.length;g++)
							{
								row_data[g]=0
								current[g]=0
							}
							row_data[category_folders.length]=1
							current[category_folders.length]=1
						
								
							var row_target =[]
							var list_of_trans_per_month = MonthlyTransactions[r]
							for(var b=0;b<list_of_trans_per_month.length;b++)
							{
								var trans_category = list_of_trans_per_month[b].category[0]
								var column = category_folders.indexOf(trans_category)

								row_data[column]+= list_of_trans_per_month[b].amount

							}

							
							var profit = salary
								
							for(var i=0;i<row_data.length;i++)
							{
									profit -= row_data[i]
							}
							row_target[0] = profit
							feats.push(row_data)
							target.push(row_target)
						}
						 client.get

						var today = new Date()
						var until_first = -(1-today.getDate())

						var currdate = moment().subtract(until_first, 'days').format('YYYY-MM-DD');
						var currend = moment().format('YYYY-MM-DD');
						

						client.getTransactions(ACCESS_TOKEN, currdate, currend, {
							count: 250,
							offset: 0,
						}, function(error, transactionsResponse) {
							if (error != null) {
								//prettyPrintResponse(error);
								return response.json({
									error: error
								});
							} else {
							var	current_transactions= transactionsResponse.transactions

								for(var b=0;b<current_transactions.length;b++)
							{
								var trans_category = current_transactions[b].category[0]
								var column = category_folders.indexOf(trans_category)

								current[column]+= current_transactions[b].amount

							}
							 prediction_lin = linearregesssion(current)
								res.json({
									transactions:MonthlyTransactions,
									pred:prediction_lin,
									score:current
								})
							}




						});

					

					
					})
					
 			})
  
 
	



				
				//console.log(MonthlyTransactions)
      }
    });
    
		
	//	start_date = new Date(end_date)
  }
  // set up list of categories

	

	/*MonthlyTransactions.forEach(transList => {
		// the weight of the monthlt budget transactions  database
		food =0
		bills=0
		entertainment=0
		travel=0
		custom=0
		profit= 0
		income = 4605.67 // dummy data
		
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
		for(var x =0 ;x<categories.length;x++)
					{
							var category_name = categories[x].hiearchy[0]
						  if(!categories.includes(hiearchy))
							{
								category_folders.push(hiearchy)
							}
					}
		
	});*/




	
	
	
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
		return setupANDpredict()
	 }
	  // user existed and has stuff in data base
	else{
		// get past  6 months transaction and push it to the monthly budget database
		setPastScore(6)//setupANDpredict()
	 return	setupANDpredict()
	}
}




// Initialize the Plaid client
// Find your API keys in the Dashboard (https://dashboard.plaid.com/account/keys)


app.get('/', function(request, response, next) {
  
  

  response.render('index.ejs', {
    PLAID_PUBLIC_KEY: PLAID_PUBLIC_KEY,
    PLAID_ENV: PLAID_ENV,
  });
});

// Exchange token flow - exchange a Link public_token for
// an API access_token
// https://plaid.com/docs/#exchange-token-flow
app.post('/get_access_token', function(request, response, next) {
  PUBLIC_TOKEN = request.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      prettyPrintResponse(error);
      return response.json({
        error: error,
      });
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
		//prettyPrintResponse(tokenResponse);
		
		setPredictions(1,request,response,next)
		
		 });
		 
		 
	
});

// Retrieve Transactions for an Item
// https://plaid.com/docs/#transactions
app.get('/transactions', function(request, response, next) {
    // Pull transactions for the Item for the last 30 days
    var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
    var endDate = moment().format('YYYY-MM-DD');
    client.getTransactions(ACCESS_TOKEN, startDate, endDate, {
      count: 250,
      offset: 0,
    }, function(error, transactionsResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      } else {
        prettyPrintResponse(transactionsResponse);
        response.json({error: null, transactions: transactionsResponse});
      }
    });
  });
  
  // Retrieve Identity for an Item
  // https://plaid.com/docs/#identity
  app.get('/identity', function(request, response, next) {
    client.getIdentity(ACCESS_TOKEN, function(error, identityResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(identityResponse);
      response.json({error: null, identity: identityResponse});
    });
  });
  
  // Retrieve real-time Balances for each of an Item's accounts
  // https://plaid.com/docs/#balance
  app.get('/balance', function(request, response, next) {
    client.getBalance(ACCESS_TOKEN, function(error, balanceResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(balanceResponse);
      response.json({error: null, balance: balanceResponse});
    });
  });
  
  // Retrieve an Item's accounts
  // https://plaid.com/docs/#accounts
  app.get('/accounts', function(request, response, next) {
    client.getAccounts(ACCESS_TOKEN, function(error, accountsResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(accountsResponse);
      response.json({error: null, accounts: accountsResponse});
    });
  });
  
  // Retrieve ACH or ETF Auth data for an Item's accounts
  // https://plaid.com/docs/#auth
  app.get('/auth', function(request, response, next) {
    client.getAuth(ACCESS_TOKEN, function(error, authResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error,
        });
      }
      prettyPrintResponse(authResponse);
      response.json({error: null, auth: authResponse});
    });
  });
  
  // Retrieve information about an Item
  // https://plaid.com/docs/#retrieve-item
  app.get('/item', function(request, response, next) {
    // Pull the Item - this includes information about available products,
    // billed products, webhook information, and more.
    client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
      if (error != null) {
        prettyPrintResponse(error);
        return response.json({
          error: error
        });
      }
      // Also pull information about the institution
      client.getInstitutionById(itemResponse.item.institution_id, function(err, instRes) {
        if (err != null) {
          var msg = 'Unable to pull institution information from the Plaid API.';
          console.log(msg + '\n' + JSON.stringify(error));
          return response.json({
            error: msg
          });
        } else {
          prettyPrintResponse(itemResponse);
          response.json({
            item: itemResponse.item,
            institution: instRes.institution,
          });
        }
      });
    });
  });
  
  var server = app.listen(APP_PORT, function() {
    console.log('plaid-quickstart server listening on port ' + APP_PORT);
  });
  
  var prettyPrintResponse = response => {
    console.log(util.inspect(response, {colors: true, depth: 4}));
  };
  
  app.post('/set_access_token', function(request, response, next) {
    ACCESS_TOKEN = request.body.access_token;
    client.getItem(ACCESS_TOKEN, function(error, itemResponse) {
      response.json({
        item_id: itemResponse.item.item_id,
        error: false,
      });
    });
  });



