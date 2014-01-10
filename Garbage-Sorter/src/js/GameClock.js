// This class is not being used at the moment

var GameClock = function(){
	
	var self = this;
	var instance;
	var timerId = 0;
	
	// Property: frequency of event of timer in millisecond, start time 
	self.Interval = 1000;
	self.Index = 60;
	
	// Property: timer is enabled or not
	self.Enable = new Boolean(false);
	
	self.Tick;
	
	self.Start = function(){
		this.Enable = new Boolean(true);
		
		instance = this;
		if(instance.Enable){
			instance.timerId = setInterval(function(){
				instance.Tick();
			}, instance.Interval);
		}
	};
	
	self.Stop = function(){
		instance.Enable = new Boolean(false);
		clearInterval(instance.timerId);
	};
	
	self
};