//CyberduckCheck
//check length of URL to see if query is present
if(document.location.search.length) {
                            //query has been found  
                            //request the DB
                            var request = new XMLHttpRequest();
                            request.onreadystatechange = function() {
                                    //if db state is ready
                                if (this.readyState == 4 && this.status == 200) {
                                  console.log("Got DB, Now to get the query"); 

                           // Grab the quoteId out of the URL by it's name
                            function getParameterByName(name, url) {
                                if (!url) {
                                url = window.location.href;
                                }
                                name = name.replace(/[\[\]]/g, "\\$&");
                                var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
                                    results = regex.exec(url);
                                if (!results) return null;
                                if (!results[2]) return '';
                                return decodeURIComponent(results[2].replace(/\+/g, " "));
                            }

                            var quoteId = getParameterByName('quoteid');

                            console.log(quoteId);
                            
                            // get the file contents
                                var fileContent = this.responseText;
                                // split into lines
                                var fileContentLines = fileContent.split( '\n' );
                                // extract the value
                                var setLine = fileContentLines[ quoteId ];
        
                                console.log (setLine);
                                console.log (quoteId);

                                // put the content into the divs and hide the loader    
                    setTimeout(function(){

                                // get total count
                                    $("#quoteTotal").html(fileContentLines.length - 1);


                                // add in the quoteId to the content
                                    $("#quoteNumber").html(quoteId);

                                // split line and set to divs
                                            var res = setLine.split("^");
                                            $("#nameDiv").html(res[0]);
                                            $("#contextDiv").html(res[1]);
                                            $("#quoteDiv").html(res[2]);
                                            $("#linkDiv").html(res[3]);


                    //generate URL                        
                  var url=window.location.href,
                        separator = (url.indexOf("?")===-1)?"?":"&",
                        newParam=separator + "quoteid=" + (quoteId);
                        newUrl=url.replace(newParam,"");
                        newUrl+=newParam;
                        //window.location.href =newUrl;
                        console.log(newUrl);

                      //trim quote to fit for twitter
                         var fullString = res[2];
                         
                        var trimmedString = res[2].substring(0, 55) + "...";
                        console.log (trimmedString);
                        if (fullString.length > 55) {
                        $("#twitterLink").attr("href","https://twitter.com/intent/tweet?text=" + trimmedString + " via " + newUrl + " %23UX %23design %23quote #wordsireadsomewhere ");
                          }
                          else{
                        $("#twitterLink").attr("href","https://twitter.com/intent/tweet?text=" + fullString + " via " + newUrl + " %23UX %23design %23quote #wordsireadsomewhere "); 
                         }

                      $("#directURL").attr("href", newUrl );
                      $("#directURL").html( newUrl );

                     //hide loader
                     var status = ("ready");
                     console.log (status);
                     if (status == "ready"){
                     $(".se-pre-con").fadeOut("slow"); 
                    }
                    

                    }, 2000);

                                }
                            }

} else {
 
//when no query is found generate random quote
                        console.log("No query. Grabbing a random quote!");
                        console.log("Just trying to track down the DB, give me a second.");
                        
                            var request = new XMLHttpRequest();
                            request.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                            
                            console.log("I have the database! Woo!");
                            
                                // get the file contents
                                var fileContent = this.responseText;
                                // split into lines
                                var fileContentLines = fileContent.split( '\n' );
                                // get a random index (line number)
                                var randomLineIndex = Math.floor( Math.random() * fileContentLines.length);
                                // extract the value
                                var randomLine = fileContentLines[ randomLineIndex ];
                                var displayCount = randomLineIndex;           

                    //wait to make sure it's loaded the quotes properly.

                    setTimeout(function(){

                                // get total count
                                    var lineCount = fileContentLines.length;
                                    $("#quoteTotal").html(lineCount);

                                // add the random line in a div
                                // document.getElementById( 'random-phrase' ).innerHTML = randomLine;
                                    $("#random-phrase").html(randomLine);
                                //     document.getElementById( 'quoteNumber' ).innerHTML = randomLineIndex;
                                    $("#quoteNumber").html(displayCount);
                                                   
                        console.log("Ok, I Did some technical math things and have the lines all counted.");

                                // split randomLine and set to divs
                                            var res = randomLine.split("^");
                                            $("#nameDiv").html(res[0]);
                                            $("#contextDiv").html(res[1]);
                                            $("#quoteDiv").html(res[2]);
                                            $("#linkDiv").html(res[3]);



                  var url=window.location.href,
                        separator = (url.indexOf("?")===-1)?"?":"&",
                        newParam=separator + "quoteid=" + (randomLineIndex);
                        newUrl=url.replace(newParam,"");
                        newUrl+=newParam;
                        //window.location.href =newUrl;
                        console.log(newUrl);

                      //trim quote to fit for twitter
                         var fullString = res[2];
                        var trimmedString = res[2].substring(0, 55) + "...";
                        console.log (trimmedString);
                        if (fullString.length > 55) {
                        $("#twitterLink").attr("href","https://twitter.com/intent/tweet?text=" + trimmedString + " via %23wordsireadsomewhere " + newUrl + " %23UX %23design %23quote  ");
                          }
                          else{
                        $("#twitterLink").attr("href","https://twitter.com/intent/tweet?text=" + fullString + " via %23wordsireadsomewhere " + newUrl + " %23UX %23design %23quote "); 
                         }

                      $("#directURL").attr("href", newUrl );
                      $("#directURL").html( newUrl );
                        

                     //hide loader
                     var status = ("ready");
                     console.log (status);
                     if (status == "ready"){
                     $(".se-pre-con").fadeOut("slow"); 
                     }

        }, 2000);
           
       }
     };
}

        //get DB file
        request.open( 'GET', 'http://www.wordsireadsomewhere.com/uxQuotesDB.txt', true );
        request.send();
