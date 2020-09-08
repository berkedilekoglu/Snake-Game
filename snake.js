

class Snake
{
	constructor()
	{
		this.x = 0;
		this.y = 0;
		


		this.xspeed = 1;
		this.yspeed = 0;
		this.score = 0;
		this.total = 0;
		this.tail = [];
		this.positions = [];
	}

	

	restart() 
	{
		this.x = 0;
		this.y = 0;
		
		this.xspeed = 1;
		this.yspeed = 0;
		this.score = 0;
		this.total = 0;
		this.tail = [];



	}
	update()
	{
		


		if ( this.total == this.tail.length)
		{
			for (var i = 0; i < this.tail.length-1; i++)
			{

				this.tail[i] = this.tail[i+1];


			}

		}

		this.tail[this.total-1] = createVector(this.x,this.y);

		this.x = this.x + this.xspeed*scl;
		this.y = this.y + this.yspeed*scl;
		


	}


	show()
	{
		fill(255);

		for(var i = 0; i< this.total; i++)
		{
			rect(this.tail[i].x, this.tail[i].y, scl, scl);
		}

		fill(155);

		rect(this.x, this.y, scl, scl);
	}

	dir(x,y){

		

		this.xspeed = x;
		this.yspeed = y;

	}

	eat(pos)
	{
		var d = dist(this.x, this.y, pos.x, pos.y);

		if (d<scl) 
		{

			this.total ++;
			this.score ++;
			return true;

		} 

		else
		{
			return false;
		}

	}

	death()
	{

		if(this.crashWall() || this.crashTail())
		{
			return true;
		}
		else
		{
			return false;
		}	
		
		
	}


	crashWall()
	{
		if ((this.x > width-scl) || (this.y > height-scl-1) || (this.x < 0 ) || (this.y < 0))
		{
			
			return true;
		}	

		else
		{
			return false;
		}

		
	}

	crashTail()
	{

		for(var i=0; i < this.tail.length; i++)
		{
			var d = dist(this.x, this.y, this.tail[i].x, this.tail[i].y);

			if (d<scl)
			{
				return true
			}
		}

		return false;


	}



	getscore()
	{
		return this.score;
	}

	getPositions()
	{
		for(var i=0; i< this.tail.length;i++)
		{
			this.positions[i] = createVector(this.tail[i].x,this.tail[i].y);
		}

		this.positions[this.tail.length] = createVector(this.x,this.y);
		return this.positions;
	}


}