// väliste sulgude sees olev nn parameeter andtakse sisendiks sisemisele funktsioonile. 
// Ehk siis me nn väärtustame $ jQueriga
// self envocing anonymos function
(function ($){
    //meil on jQuery jaoks vaja seda $ sümbolit, seepärast on see meie funktsiooni nn parameetriks
   
   //the user cann pass changeble option to our function
   $.fn.HeilySlider = function (options){
       
       //nn määram default väärtused
       
       //PSPSPS!!kui su pause on väiksem kui speed siis ta ei tööta, minigi kala tekib sisse!
       var defaults = {
           speed: 500,
           pause: 2000,
           trandition: 'slide',
           manual_control: true
       },
       // me kirjutame defaultid üle selllega mida kasutaja meile sisse saatis
           options = $.extend(defaults, options);
           
           // this on see element mille peal me oma funktsiooni välja kutsume, ning me itereerime üle kõigi .. 
           // ala meil ju 4 pilti vms
          
          this.each(function(){
              
              //me nn käshime selle tavalise muutuja sisse
              var $this = $(this),
                  header_height= $('header').outerHeight(),
                  content_height =$('#content').outerHeight(),
                  next_height=$('.next').outerHeight(),
                  prev_height=$('.next').outerHeight(),
                  next_slide,
                  prev_slide,
                  current_slide,
                  total,
                  children = $this.children(),
                  first_child = $this.children(':first'),
                  last_child = $this.children(':last');
              
              
              
              //we are going to wrap our ul
              
              $this.wrap('<div class="slider-wrap" />');
              
              //sellega me eemaldame selle kala, et tekib hüpe sisse
              
              if(options.pause <= options.speed) options.pause = options.speed +100;
               
              current_slide = first_child;
              prev_slide = last_child;
              
                                   
              if(options.trandition == 'slide'){
                
                  //add some css to our slider_wrap
                  //with this we set the spesific width and overflow hidden, so all other pics are hiddrn
                  $('.slider-wrap').css({
                      //me ütleme et ta laius on nii suur kui ta lapse laius
                      'width': $('#content').width(),
                      'height': $('#content').height()//,
                      
                  });
                  
                  //set the width of the child to the same as its parent div
                   children.css({
                        'width': $('.slider-wrap').width()-20,
                        'height': $('.slider-wrap').height()-20
                
              });
                  
                  
                  if(options.manual_control){
                     
                     if(children.size()>1){
                        $('.next').css('visibility', 'visible');
                        $('.next').css('top', header_height+(content_height/2)-(next_height/2));
                        $('.next').css('left',$('#content').width());
                        $('.next').bind('click', slideOnceForwards);
                    
                        $('.prev').css('visibility', 'visible');
                        $('.prev').css('top', header_height+(content_height/2)-(prev_height/2));
                        $('.prev').css('right',$('#content').width());
                        $('.prev').css('opacity', '0.2'); 
                        }
                   
                      
                  }
                  else {auto_slide()}
                  
                  
              } // if SLIDE END
              
       
                   
               function auto_slide(){
                   
                   
                       
                       setInterval(function(){slideOnceForwards()()},options.pause);
                       
                       
                   }
                   
                   
               
               function slideOnceForwards(){
                   
                   //kui on esimene pily
                   if(current_slide.index()==0){
                   $this.animate({'left': '-'+$this.parent().width()},options.speed, function(){
                       
                       
                        $('.prev').bind('click', slideOnceBackWards);
                        $('.prev').css('opacity', 1)
                        
                       prev_slide = current_slide;
                       current_slide = current_slide.next();
                    
                       
                        
                        
                 
                   });}
               // kui on kõik vahepealsed pildid
               else if (current_slide.index()< children.size()-1){
                   $this.animate({'left': '-'+$this.parent().width()*(current_slide.index()+1)},options.speed, function(){
                       
                       
                       prev_slide = current_slide;
                       current_slide = current_slide.next();
                       
                       if(current_slide.index() == children.size()-1){
                            $('.next').css('opacity', '0.2');
                           $('.next').unbind('click', slideOnceForwards);
                       }
                      
         
                 
                   });
                   
               }
           
              
         
               
               
                  
               }
               
               function slideOnceBackWards(){
                   
                                 
                  
                  var left = parseInt($this.css('left').replace('px',''));
                  var awidth =$this.parent().width(); 
                  var x= left+awidth;
                  
                  console.log(x);
                    
                  $this.animate({'left': left+awidth},options.speed, function(){
                      
                     
                     
                         
                       if(current_slide.index()==children.size()-1){
                                                          
                                prev_slide = current_slide;
                                current_slide = current_slide.prev();
                             
                             $('.next').bind('click', slideOnceForwards);
                             $('.next').css('opacity',1);
                               
                             }  
                       else if (current_slide.index()< children.size()-1){
                                  
                                prev_slide = current_slide;
                                current_slide = current_slide.prev();
                                if(current_slide.index()== 0){
                                      
                                    $('.prev').unbind('click',slideOnceBackWards);
                                    $('.prev').css('opacity',0.2);
                                }
                       }
                      
                       
                        
                        
                 
                   });
                   
                   
               }
              
          }); //each function ends
           
       }
       
   
    
})(jQuery);


