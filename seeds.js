var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
	{name: "Redwood National Park", 
	 image: "https://media.glampinghub.com/CACHE/images/accommodations/07-glamping-adf39207-69ee-4f46-91f1-25b3b4ec9fc5_01-glamping-356d3a84-88d3-4820-855d-5c487092bb73/f7e8ddd8041ee519319504928eb89265.jpg",
	 description: "With planning, camping in Redwood National and State Parks will be an enjoyable and rewarding pastime for visitors of all ages, backgrounds, and experience levels."},
	{name: "Yellowstone National Park", 
	 image: "https://media-cdn.tripadvisor.com/media/photo-s/01/24/c8/b8/dinner-with-a-friend.jpg",
	 description: "Centrally located to all of Yellowstones big attractions. Walking distance to the Norris Geyser Basin. Clean bathrooms and convenient dish washing room. Nestled right along a lovely winding river where you could swim, fish or just sit and enjoy watching the Elk and Bison roaming nearby."},
	{name: "Yosemite National Park", 
	 image: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/ef/e4/20.jpg",
	 description: "Camping out is the best ways to see Yosemite National Park, and luckily, there are thirteen camping areas in the park. Camping in this Park can be challenging during the summer, but if you are able to make reservations early, you can be assured of getting the right spot for your vacation."}
]

function seedDB(){
	//remove all camprounds
	Campground.remove({}, function(err){
	if(err){
		console.log(err);
	}else{
		console.log("remove campgrounds!");
		// add a few campgrounds
	    data.forEach(function(seed){
		  Campground.create(seed, function(err, campground){
			if(err){
				console.log(err);
			}else{
				console.log("added a campground");
				//create a comment
				Comment.create({text: "This place is great, but I wish the price lower ",
							    author: "Mike"
							   }, function(err, comment){
					              if(err){
									  console.log(err);
								  }else{
									  campground.comments.push(comment);
									  campground.save();
									  console.log("Created new comments");
								  }
				});
			}
		});
	});
	}
});
}

module.exports = seedDB;