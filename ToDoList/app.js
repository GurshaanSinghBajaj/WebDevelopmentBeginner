//jshint esversion:6

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const _ = require("lodash");
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
//this code is used to add a folder to to store the static elements of the website such as the css 
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/todoListDB", {useNewUrlParser: true});
mongoose.set('useFindAndModify', false);
app.set('view engine', 'ejs');

const itemSchema = {
    name: String
};

const listSchema = {
    name: String,
    items: [itemSchema]
};

const List = mongoose.model("List", listSchema);
const Item = mongoose.model("Item", itemSchema);

const item1 = new Item({
    name: "Welcome to your ToDo List."
});

const item2 = new Item({
    name: "Hit the + button to add a new item."
});

const item3 = new Item({
    name: "<-- Hit this to delete an item."
});

const defaultItems = [item1, item2, item3];

app.post("/delete",function(req,res){
    let itemID = req.body.checkbox;
    let listName = req.body.type;

    if(listName == "Default") {
        console.log("Delete " + itemID);
        Item.findByIdAndDelete(itemID, function(err){
            if(!err){
                console.log("Successfully deleted");
                res.redirect("/");
            }
        }); 
    }
    else {
        List.findOneAndUpdate({name: listName}, {$pull: {items: {_id: itemID}}}, function(err,foundList){
            if(!err){
                res.redirect("/"+listName);
            }
        });
    }  
});

app.post("/",function(req,res){
    let text = req.body.newItem;
    let listName = req.body.list;

    const item = new Item ({
        name: text
    });

    if(listName == "Default"){
        item.save();
        res.redirect("/");
    }
    else {
        List.findOne({name:listName}, function(err,foundList){
            foundList.items.push(item);
            foundList.save();
            res.redirect("/" + listName);
        });
    }
});

app.get("/",function(req,res){
    /*
    let today = new Date();
    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    let day = today.toLocaleDateString("en-US", options);
    */

    Item.find({},function(err,foundItems){

        if(foundItems.length===0) {
            Item.insertMany(defaultItems, function(err){
                if(err) {
                    console.log(err);
                }
                else {
                    console.log("Succesfully added default items");
                }
            });
            res.redirect("/");
        }
        else {
            res.render("index",{
                listTitle: "Default",
                itemList: foundItems  
            });
        }
    });
});

app.get("/:customListName", function(req,res){
    const customListName = _.capitalize(req.params.customListName);

    List.findOne({name:customListName}, function(err,foundList){
        if(!err){
            if(!foundList){
                const list = new List({
                    name: customListName,
                    items: defaultItems
                });
                list.save();
                res.redirect("/" + customListName);
            }
            else {
                res.render("index",{
                    listTitle: customListName,
                    itemList: foundList.items
                });
            }
        }
    });
});
    
app.listen(3000,function(){
    console.log("server started");
});        