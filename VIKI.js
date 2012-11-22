/* CORE FUNCTIONS */
/*
 *           Настраивает приложение, близок к linux init
 */
function VIKI(first_callback, is_test_mode){
    /* CONSTRUCTOR */
    VK.init(function() {
        first_callback();
    });
    /* PRIVATE METHODS */
    function log(data){
        console.log(data);
    }
    /* PUBLIC METHODS */
    this.api = function (str_method, data, callback){
            data.test_mode = is_test_mode;
            VK.api(str_method, data, function(back_data){
                var error = back_data.error;
                var response = back_data.response;
                if(error){
                    log(error);
                    if(data.test_mode){
                        alert(error.error_msg);
                    }
                }
                if(data.test_mode){
                    log('Api callback on "' + str_method + '" executed' + "\n");
                    log('Here is data:');
                    log(response);                     
                }
                callback(response); 
            });
        };
    this.js = function(){
            VK.callMethod.apply(VK.callMethod, arguments);
            log('Call js method "' + arguments[0] + '"');
        };
    this.addCallback = function(name, callback){
            VK.addCallback(name, callback);
    }
    this.removeCallback = function(name, callback){
            VK.removeCallback(name, callback);
    };
}