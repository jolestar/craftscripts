'use strict';
org.mozilla.javascript.Context.getCurrentContext().getFactory().enterContext();
var global = this;

importClass(java.lang.System);
importClass(java.net.URL);
importClass(java.util.Timer);
importClass(java.util.TimerTask);
importClass(javax.swing.filechooser.FileNameExtensionFilter);
importPackage(java.awt.image);
importClass(java.awt.image.BufferedImage);
importPackage(javax.imageio);
importPackage(javax.swing);
importPackage(java.awt);
importPackage(java.io);
importPackage(org.lwjgl.input);
importPackage(org.mozilla.javascript);

importPackage(com.sk89q.worldedit);
importPackage(com.sk89q.worldedit.blocks);
importPackage(com.sk89q.worldedit.patterns);
importPackage(com.sk89q.worldedit.masks);
importPackage(com.sk89q.worldedit.vector);
importPackage(com.sk89q.worldedit.regions);
importPackage(com.sk89q.worldedit.regions.region);
importPackage(com.sk89q.worldedit.tools);
importPackage(com.sk89q.worldedit.util);
//importClass(com.sk89q.worldedit.util.TreeGenerator);
importPackage(com.sk89q.worldedit.tools.brushes);
importPackage(com.sk89q.worldedit.schematic);
importPackage(com.sk89q.worldedit.commands);

var session = context.getSession().createEditSession(player);		// worldedit globals
var localSession = context.getSession();
var worldEdit = getWorldEdit();

var tools = [];		// static object globals
var oreList = [];
var trees = [];
var shapes = [];
var blocks = [];
var text = [];
var windowColors = [];
var blockColors = [];

var myKit = [];		// shape and kit object globals
var myShape = [];

var vecList = [];
var offsetVec = [];

var blockThread = [];
blockThread.data = [];

var version = "2.0";

var brush;
var stage = 0;
var invert = 1;
var zVec = new Vector(0,0,0);
var gVec = new Vector(0,0,0);
var gSize = -1;
var blockThreadStatus = -1;
var brushTool = localSession.getBrushTool(player.getItemInHand());
var airMat = new SingleBlockPattern(new BaseBlock(0,1));
var gMat = airMat;
var gTimer = new Timer();

var $repeat = false;

var $global = {};

var $base = {};
var $debug = {};
var $map = {};
var $input = {};
var $textBuilder = {};

var $spc = checkSPC();

LoadStaticObjects();

var mode;

//setBlockThread(4, 1, 1000);
var $debugMode = true;

//print("Latest Version = " + loadRemoteFile("http://inhaze.net/files/php/build.php?id=version", 1));

//////////////////////////////////////////////////////////
//				jFrame Window Classes
//////////////////////////////////////////////////////////



var tm = new javax.swing.Timer(20, new java.awt.event.ActionListener() {
    actionPerformed: function (e) {
			
			return;
	        if (Keyboard.isKeyDown(Keyboard.KEY_A)) {
		    player.print("A Key Pressed");
		}
	        if (Keyboard.isKeyDown(Keyboard.KEY_S)) {
		    player.print("S Key Pressed");
		}
	        if (Keyboard.isKeyDown(Keyboard.KEY_D)) {
		    player.print("D Key Pressed");
		}
		//while ((k = org.lwjgl.input.Keyboard.next())){
			//if (k) player.print("Default Event = " + e);
		//} //while (typeof k != 'undefined')
		
				//run the function for the specified mode
		//else BuildTimerTool(tools[mode].mySub, pos);		
		
		if (Mouse.isButtonDown(0)) {
			player.print("Mouse Down");
			global.tools[global.mode].mySub(getTarget());
		}
	}
});


//tm.start();
Toolkit.getDefaultToolkit().addAWTEventListener(new java.awt.event.AWTEventListener() {    
	eventDispatched: function(event) {
		//player.print("Something happend! = " + event);
		tm.restart();
	}
}, -1);


var mcWrapper = function mcWrapper() {
	this.world = null;
	this.server = null;
	this.player = null;
	
	mcWrapper.prototype.initialize = function initialize() {
		
		if ($spc != false) {
			this.world = $spc.worldMC;
			this.player = $spc.playerMC;
			this.server = $spc.server;				
		}
		
	};
	
	mcWrapper.prototype.displayGUIEditSign = function displayGUIEditSign(vec, txtAr) {
		this.player.a(this.getTileEntity(vec));  // opens the sign gui screen from a tile entity
	};
	
	mcWrapper.prototype.setSignText = function setSignText(vec, txtAr) {
		this.getTileEntity(vec).a = txtAr;	//setting sign text on tile entity; doesn't update till chuck reload, or game
	};
	
	mcWrapper.prototype.getTileEntity = function getTileEntity(vec) {
		return this.world.r(java.lang.Integer(vec.getX()), java.lang.Integer(vec.getY()), java.lang.Integer(vec.getZ()));
	};
	
	
	this.initialize();
	
	/*	Test Ref
	
		//for (var qwerty = 0 ; qwerty < 100000; qwerty++) {
			//player.print("ID = " + getFastBlockID(vec.add(0,0,0)));
			//player.print("Data = " + getFastBlockData(vec.add(0,0,0)));
			//var tblk = getBlock(vec).ID;
			//var tbb = $spc.world.getBlockId(com.sijobe.spc.wrapper.Coordinate(vec.getX(), vec.getY(), vec.getZ()))
			
			// mc.d = is block a tile entity? (int,int,int);
			// mc.g = block material type? maybe the chunk?
			// mc.h = block metadata
			// mc.i = set to air
			// mc.l = block is a chest?
			// mc.m = something, no idea
			// mc.r = tile entity data! maybe... it is!
			
			
			
			var tile = ($spc.worldMC.r(java.lang.Integer(vec.getX()), java.lang.Integer(vec.getY()), java.lang.Integer(vec.getZ())));
			
			//tile.a(String("The precious"));			// set tile entity display name
			//printDebug("tile", ObjToStr(tile));
			//printDebug("printObject(tile, 2)", printObject(tile.class.methods[1], 3));
			
			var nbt = net.minecraft.src.NBTTagCompound; //("Text1");
			var nbt2 = tile;
			//var nbt3 =  nbt2.c;
			stage = tile;
			//var nbt4 = nbt3.toString();
			//printDebug("$spc.worldMC", $spc.worldMC);
			//printDebug("nbt", ObjToStr(nbt));
			
		
			//$spc.worldMC.a(new java.lang.String("lava"), new java.lang.Double(String(vec.getX())), new java.lang.Double(String(vec.getY()+3)), new java.lang.Double(String(vec.getZ())), new java.lang.Double(String("0")), new java.lang.Double(String("1")), new java.lang.Double(String("0")));
			//var tid = getFastBlockID(vec);
			//var tdata = ("Data = " + getFastBlockData(vec.add(0,0,0)));
	
		$spc.player.addPotionEffect(1 ,5 * 20, 5);
		
		//printDebug("tmpMe.moveForwardField", ObjToStr(tmpMe.getClass().getCanonicalName()));
		//mpMe.getClass.method[1]();
		
		//printDebug("tmpMe", printObject(tmpMe, 2));
		//tmpMe.displayGUIChest($spc.player.getInventoryEnderChest());
		//printDebug("tile", tile.getClass().getFields()[0]);
		//printDebug("tile", ObjToStr(tile.a));
		
		

		printDebug("tile.a", tile.a[0]);
		return;
		
		tile.b();
		//tile.c();
		//tile.d();
		tile.e();
		tile.i();
		tile.h();
		tile.s();
		tile.w_();
		//tile.j();
		//tile.k();
		printDebug("tile.getClass().getMethods()", ObjToStr(tile.getClass().getMethods()));
		//player.print("Total Time = " + (new Date().getTime()- timeStart));
		//printDebug("tile.a ", tile.a[0]]); 
			
	
	
	
	*/
	
}


var mcw = new mcWrapper();
mcw.setSignText(getTarget().vec, ["aaaa", "bbb", "cc", "d"]);
mcw.displayGUIEditSign(getTarget().vec);


var GlobalManager = new function GlobalManager() {
	
	this.globalId = '$global';
	this.globalList = [];
	this.globalCount = 0;
	this.creationTime = 0;
	this.GlobalManager = function GlobalManager() {
		player.print("Global Manager created.");
	};
	

	GlobalManager.prototype.getGlobal = function getGlobal (globalKey) {
	
	
	};
	
	GlobalManager.prototype.saveGlobal = function saveGlobal (globalKey, globalVar) {
	
	
	};

	GlobalManager.prototype.removeGlobal = function removeGlobal (globalKey) {
	
	

	};

	GlobalManager.prototype.replaceGlobal = function replaceGlobal (globalKey, globalVar) {
	
	
	};
	

}

var FrameManager = function FrameManager() {
	
	this.globalId = '$manager';
	this.frameList = [];
	this.frameCount = 0;
	this.creationTime = 0;
	
	FrameManager.prototype.loadFrame = function loadFrame (frame) {
	
	
	
	}

	FrameManager.prototype.unloadFrame = function loadFrame (frame) {
	
	

	}

}


var ToolBase = function ToolBase () {

	this.name =  "ToolBase";	
	this.note = "ToolBase Note";
	this.keys = ["toolbase"];
	this.visible = true;
	this.size = 15;
	this.cleanArgs = [];
	this.dirtyArgs = [];
	
	this.runCnt = 0;
	
	var argTyp = {
		value:1,
		string:2,
		block:3,
		percentage:4,
		minmax:5,
		flag:6
	};
	
	this.args = [
		{ 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: argTyp.value, 
			def: 15,
			min: 0,
			max: 500
		},
		{ 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: argType.block,
			def: 0
		}		
	];

	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (argArray) {				//initialize when the initial command is given
		this.checkArgs();
		this.loadArgs();
		this.loadTool();
		this.printInfo();
		return;
	};
	
	
	
	
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};
} ;

var ToolDouble = function ToolDouble () {
	ToolDouble.prototype = new ToolBase();
	ToolDouble.prototype.rightClick = function rightClick() { };
	ToolDouble.prototype.leftClick = function leftClick() { };




};

var ToolBrush = function ToolBrush () {};



/* //var BaseFrame = new JFrame() {
var CaseFrame = function CaseFrame() {
	CaseFrame.prototype = new JFrame();
	this.globalId = '$case';
	this.loader = CaseFrame;
	this.obj = 0;
	this.frame = 0;
	this.initialize = function initialize(newTitle, newColor) {
		//this.initializeBase(newTitle, newColor);
		//this.initializeMain();
		this.test();
	};
	this.test = function test() {
		//player.print("CaseFrame = " + ObjToStr(this));
		player.print("ObjToStr(this) = " +  ObjToStr(this));
	}
};

var blah = new CaseFrame();

blah.test(); */



var BaseFrame = function BaseFrame() {

	this.globalId = '$base';
	this.loader = BaseFrame;
	this.obj = 0;
	this.frame = 0;
	this.bounds = {x:512, y: 256, width:750, height:400};	
	this.frameMinWidth = 250;
	this.frameMinHeight = 150;
	this.topBarHeight = 22;
	this.resizeLabelSize = 6;
	this.frameBorder = 4;
	this.titleLength = 0;
	this.title = "Base Window";
	this.color = windowColors['darkStrong'];	
	this.compList = [];
	this.allowResize = true;
	this.allowMinimize = true;
	this.allowMove = true;	
	this.allowFold = true;
	this.allowClose = true;
	this.allowTitle = true;
	this.allowTopGap = true;
	
	BaseFrame.prototype.initialize = function initialize(newTitle, newColor) {
		this.initializeBase(newTitle, newColor);
		this.initializeMain();
	};
	
	BaseFrame.prototype.initializeBase = function initialize(newTitle, newColor) {
		if (typeof newTitle != 'undefined') this.title = newTitle;
		if (typeof newColor != 'undefined') this.color = newColor;
		
		if (this.findFrame(this.title)) { 
			this.frame = this.findFrame(this.title);
			this.obj= this;
		}
		else {
			this.build();
			this.resize();
			this.loadSettings();		
			this.show();
		}
	};

	BaseFrame.prototype.initializeMain = function initialize(newTitle, newColor) { };

	BaseFrame.prototype.finalize = function finalize() { };	
	
	BaseFrame.prototype.reload = function reload() {
		var tmpColor = this.color;
		var tmpTitle = this.title;
		if (this.findFrame(this.title)) {
			this.kill()
			this.obj = null;
		}
		var newFrame = new this.loader();
		newFrame.initialize();
		saveGlobal(this.globalId, newFrame);
		return newFrame;
	};	
	
	BaseFrame.prototype.build = function build() {
		this.buildBase();
		this.buildMain();
	}
	
	BaseFrame.prototype.buildBase = function buildBase() {
		try{
			UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());
			var timeStart = new Date().getTime();
			var lastX = -1; 
			var lastY = -1; 
			var lastWindowX = -1; 
			var lastWinodwY = -1;
			var dragType = null;
			
			var screenSize = Toolkit.getDefaultToolkit().getScreenSize();
			var frameWidth = this.bounds.width;
			var frameHeight = this.bounds.height;
			var topBarHeight  = this.topBarHeight;
			var frameBorder  = this.frameBorder;
			var resizeLabelSize = this.resizeLabelSize;
			
			var frame = new JFrame(this.title);
			frame.setDefaultCloseOperation(JFrame.HIDE_ON_CLOSE);
			frame.setUndecorated(true);
			frame.setAlwaysOnTop(true);
			frame.setLayout(null);			
			frame.setBackground(this.color);
			frame.setVisible(true);
			
			frame.setBounds(this.bounds.x, this.bounds.y, this.bounds.width, this.bounds.height);
			
			this.frame = frame;
			this.obj = this;
			var pointer = this.obj;

			var labelTitle = new JLabel(this.title, JLabel.LEFT);
			labelTitle.setFont(new Font("Trebuchet MS", Font.BOLD, 17));
			labelTitle.setForeground(windowColors.lightMedium);
			labelTitle.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
			
			var labelResize = new JLabel();	
			labelResize.setOpaque(false);
			labelResize.setBackground(windowColors.clear);
			labelResize.setCursor(new java.awt.Cursor(java.awt.Cursor.NW_RESIZE_CURSOR ));
			
			var img = new BufferedImage(resizeLabelSize, resizeLabelSize, BufferedImage.TYPE_INT_ARGB);	
			var g = img.getGraphics();
			g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
			g.setColor(new Color(1, 1, 1, .75));
			g.fillPolygon([0,5,5], [5,5,0],3);
			g.setColor(windowColors.clear);
			g.dispose();
			labelResize.setIcon(new ImageIcon(img));
			img = null;
			
			var labelClose = new JLabel("x", JLabel.LEFT);
			labelClose.setFont(new Font("Trebuchet MS", Font.BOLD, 17));
			labelClose.setForeground(windowColors.lightMedium);
			
			var labelMinMax = new JLabel("=", JLabel.RIGHT);
			labelMinMax.setFont(new Font("Trebuchet MS", Font.BOLD, 17));	
			labelMinMax.setForeground(windowColors.lightMedium);
			
			var topSeperator = new JSeparator();
			topSeperator.setBackground(windowColors.lightMedium);
			topSeperator.border = null;		
		
			var lastResize = null;
			var lastMove = null;			
		
			frame.addWindowFocusListener(focusListener = function focusListener(evt) {	// frame focus listener ; folds/shows window on change
				if (labelMinMax.getText() != '=') {
					if(evt.toString().indexOf("GAINED_FOCUS") != -1) {
						pointer.maximize.call(pointer);
					}
					else if((evt.toString().indexOf("LOST_FOCUS")) != -1 ) {
						pointer.fold.call(pointer);
					} 
				}
			});		
		
			frame.addMouseListener(new java.awt.event.MouseListener() {					// frame double click ; fold window up/down
				mouseClicked: function(evt) {
					var timeNow = new Date().getTime();
					if (timeNow - timeStart < 200) {
						if (pointer.frame.getHeight() > pointer.topBarHeight+pointer.frameBorder) {
							pointer.fold.call(pointer);
						}
						else {
							pointer.maximize.call(pointer);
						}
					}
					timeStart = timeNow;
				},
				mousePressed: function (evt) {
					lastResize = [
						evt.getXOnScreen(),						// lastX
						evt.getYOnScreen(), 					// lastY
						pointer.frame.getLocation().getX(),		// lastWindowX
						pointer.frame.getLocation().getY()		// lastWindowY
					]
					lastMove = lastResize;
					return;
				},
				mouseReleased: function (evt) {
					if (lastResize != null && (lastResize[0] != evt.getXOnScreen() || lastResize[1] != evt.getYOnScreen())) {
						/* 						
						pointer.bounds = {
							x:pointer.frame.getLocation().getX(),
							y:pointer.frame.getLocation().getY(),
							width:pointer.frame.getWidth(),
							height:pointer.frame.getHeight()
						}
						*/
					}
				
					lastResize = null;
					lastMove = null;
				},				
				mouseEntered: function (evt) { 
					//player.print("evt=" + evt);
					//pointer.frame.repaint();
					//pointer.show();
				},
				mouseExited: function (evt) {
					pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR ));
					//pointer.fadeColor(pointer.frame, pointer.frame.setBackground, windowColors[pointer.color], windowColors.clear, 2000);
					
				}				
			});
			
			frame.addMouseMotionListener(new java.awt.event.MouseMotionListener(){		//  frame mouse drag ; move window
				mouseMoved: function (evt) {
					if (pointer.allowResize == false) return;
					if (evt.getX() < pointer.frameBorder && 										// Left side resize
						evt.getY() > pointer.topBarHeight+pointer.frameBorder && 
						evt.getY() < pointer.bounds.height-pointer.resizeLabelSize) {
							pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.W_RESIZE_CURSOR ));
					}
					else if (evt.getX() > pointer.resizeLabelSize && 									// Bottom side resize
						evt.getX() < pointer.bounds.width-pointer.resizeLabelSize && 
						evt.getY() > pointer.bounds.height-pointer.frameBorder) {
							pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.S_RESIZE_CURSOR ));
					}
					else if (evt.getX() > pointer.bounds.width-pointer.frameBorder && 	//Right side resize
						evt.getY() > pointer.topBarHeight+pointer.frameBorder && 
						evt.getY() < pointer.bounds.height-pointer.resizeLabelSize) {
							pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.E_RESIZE_CURSOR ));
					}
					else {
						pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.DEFAULT_CURSOR ));	
					}
					
					//printDebug("evt.getX()", evt.getX());
					//printDebug("evt.getY()", evt.getY());
				},
				mouseDragged: function (evt) {
					try {
						if (pointer.allowMove == false) return;						
						
						if (evt.getX() < pointer.frameBorder && 										// Left side resize
							evt.getY() > pointer.topBarHeight+pointer.frameBorder && 
							evt.getY() < pointer.bounds.height-pointer.resizeLabelSize) {
								lastMove = null;
								pointer.bounds.x = lastResize[2] + (evt.getXOnScreen() - lastResize[0]);
								pointer.frame.setLocation(pointer.bounds.x, pointer.frame.getLocation().getY());
								var newWidth = (pointer.bounds.width - (evt.getXOnScreen() - lastResize[0]));//pointer.frame.getWidth() - (evt.getXOnScreen() - lastResize[0])/2;
								pointer.frame.setSize(newWidth, pointer.frame.getHeight()) ;	
								pointer.resizeBase();
								pointer.resizeMain();
						}
						else if (evt.getX() > pointer.resizeLabelSize && 									// Bottom side resize
							evt.getX() < pointer.bounds.width-pointer.resizeLabelSize && 
							evt.getY() > pointer.bounds.height-pointer.frameBorder) {
								//pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.S_RESIZE_CURSOR ));
						}
						else if (evt.getX() > pointer.bounds.width-pointer.frameBorder && 	//Right side resize
							evt.getY() > pointer.topBarHeight+pointer.frameBorder && 
							evt.getY() < pointer.bounds.height-pointer.resizeLabelSize) {
								//pointer.frame.setCursor(new java.awt.Cursor(java.awt.Cursor.E_RESIZE_CURSOR ));
						}					
						else if (evt.getX() > pointer.frameBorder && 									//Titlebar move 
							evt.getX() < pointer.bounds.width-pointer.frameBorder && 
							evt.getY() < pointer.bounds.height-pointer.frameBorder &&
							lastMove != null) {
								pointer.frame.setLocation(lastMove[2]+(evt.getXOnScreen() - lastMove[0]), lastMove[3] + (evt.getYOnScreen() - lastMove[1]));
								pointer.bounds.x = lastMove[2] + (evt.getXOnScreen() - lastMove[0]);
								pointer.bounds.y = lastMove[3] + (evt.getYOnScreen() - lastMove[1]);
								
								
								//pointer.frame.setLocation(lastWindowX+(evt.getXOnScreen() - lastX), lastWindowY + (evt.getYOnScreen() - lastY));
								//pointer.bounds.x = lastWindowX + (evt.getXOnScreen() - lastX);
								//pointer.bounds.y = lastWindowY + (evt.getYOnScreen() - lastY);

						}
						pointer.show();
					}
					catch(e) {
						player.print("Mouse Error: " + e);
					}
				},
			});
				
			labelResize.addMouseMotionListener(new java.awt.event.MouseMotionListener(){	//  frame resize icon ; resize window
				mouseMoved: function (evt) {
					if (!pointer.allowResize) return;
					if (lastResize != null)	 {
						lastResize = null;
					}
				},
				mouseDragged: function (evt) {
					try {
						if (!pointer.allowResize) return;
						if (lastResize == null)	 {
							lastResize = [
								evt.getXOnScreen(),				// lastX
								evt.getYOnScreen(), 			// lastY
								pointer.frame.getWidth(),		// lastWindowX
								pointer.frame.getHeight()		// lastWindowY
							]
							return;
						}
						pointer.bounds.width = parseInt(Math.max(lastResize[2]+(evt.getXOnScreen() - lastResize[0]), pointer.frameMinWidth));
						pointer.bounds.height = parseInt(Math.max(lastResize[3]+(evt.getYOnScreen() - lastResize[1]), pointer.frameMinHeight));
						pointer.setSize(pointer.bounds.width, pointer.bounds.height);	
						pointer.resize();		
					}
					catch(e) {
						player.print("Mouse Error: " + e);
					}
				}
			});
			
			labelTitle.addMouseListener(new java.awt.event.MouseListener() {					// frame title label ; minimize/maximize window
				mouseClicked: function(evt) {
					if (evt.getButton() == 1) {
						if (pointer.frame.getHeight() == topBarHeight+pointer.frameBorder) {
							pointer.maximize.call(pointer);
						}
						else  { 
							pointer.minimize.call(pointer);
						}	
					}
					else {
						pointer.saveSettings();
						pointer.fadeColor(pointer.compList['baseTitle'], pointer.compList['baseTitle'].setForeground, windowColors.clear, windowColors.lightMedium, 700);
						return;					
					}
				},
				mousePressed: function (evt) {
					//pointer.compList['baseTitle'].setForeground(windowColors.white);
				},
				mouseReleased: function (evt) {
					//pointer.compList['baseTitle'].setForeground(windowColors.white);
				},					
				mouseEntered: function (evt) {
					pointer.compList['baseTitle'].setForeground(windowColors.white);
				},
				mouseExited: function (evt) {
					pointer.compList['baseTitle'].setForeground(windowColors.lightMedium);
				}		
			});
			
			labelTitle.addMouseMotionListener(new java.awt.event.MouseMotionListener(){		//  frame title label ; mouse window drag
				mouseMoved: function (evt) {
					
					if (lastX > 0)	 {
						lastX = -1; 
						lastY = -1; 
						lastWindowX = -1; 
						lastWinodwY = -1;
					}
				},
				mouseDragged: function (evt) {
					try {
						if (lastX < 0)	 {
							lastX = evt.getXOnScreen();
							lastY = evt.getYOnScreen();
							var windowLoc = frame.getLocation();
							lastWindowX = windowLoc.getX();
							lastWindowY = windowLoc.getY();
							return;
						}
						frame.setLocation(lastWindowX+(evt.getXOnScreen() - lastX), lastWindowY + (evt.getYOnScreen() - lastY)) 
					}
					catch(e) {
						player.print("Mouse Error: " + e);
					}
				}
			});
			
			labelMinMax.addMouseListener(new java.awt.event.MouseListener(){			//  frame min/max icon ; fold window up/down

				mouseClicked: function (evt) {
					if (labelMinMax.getText() == "=") {		// [open | autofold off] ---> [manually folded]
						pointer.fold.call(pointer);
					}
					else if (labelMinMax.getText() == "-"){	// [open | autofold on] ---> [open | autofold off]
						pointer.compList['baseMinMax'].setText("=");
					}
					else if (labelMinMax.getText() == "+") {	// [manually folded] ---> [open | autofold on]
						pointer.maximize.call(pointer);

					}
				},
				mouseEntered: function (evt) { pointer.compList['baseMinMax'].setForeground(windowColors.white); },
				mouseExited: function (evt) { pointer.compList['baseMinMax'].setForeground(windowColors.lightMedium); }
			}); 
			
			labelClose.addMouseListener(new java.awt.event.MouseListener(){				//  frame x/close icon ; close window
				mouseClicked: function (evt) { frame.dispatchEvent(new java.awt.event.WindowEvent(frame,java.awt.event.WindowEvent.WINDOW_CLOSING)); },
				mouseEntered: function (evt) { pointer.compList['baseClose'].setForeground(windowColors.white); },
				mouseExited: function (evt) { pointer.compList['baseClose'].setForeground(windowColors.lightMedium); }	
			}); 
			
			this.frame = frame;
			
			this.addComp('baseTitle', labelTitle);
			this.addComp('baseMinMax', labelMinMax);
			this.addComp('baseClose', labelClose);
			this.addComp('baseResize', labelResize);
			this.addComp('baseTopGap', topSeperator);
			this.centerFrame();
			this.setTitle(this.title);

			this.obj = this;
		}
		catch(e) {
			if (e.javaException) print("BaseFrame Error(Java): = {" + e.javaException + "}");
			if (e.rhinoException) print("BaseFrame Error(Rhino): = {" + e.rhinoException + "}");
			return;
		}
	};
	
	BaseFrame.prototype.buildMain = function buildMain() { };	
	
	BaseFrame.prototype.resize = function resize() {
		this.resizeBase();
		this.resizeMain();
	};
	
	BaseFrame.prototype.resizeBase = function resizeBase() {	
		
		var fWidth = this.frame.getWidth();
		var fHeight = this.frame.getHeight();	
		
		if (this.allowTitle != false) this.compList['baseTitle'].setBounds(this.frameBorder*2, 2, this.titleLength + this.frameBorder*2, 22);
		if (this.allowFold != false) this.compList['baseMinMax'].setBounds(fWidth -36, this.frameBorder, 13, 18);
		if (this.allowClose != false) this.compList['baseClose'].setBounds(fWidth-17, 3, 13, 18);
		if (this.allowResize != false) this.compList['baseResize'].setBounds(fWidth-this.resizeLabelSize, fHeight-this.resizeLabelSize, this.resizeLabelSize, this.resizeLabelSize);
		if (this.allowTopGap != false) this.compList['baseTopGap'].setBounds(this.frameBorder, 23, fWidth-this.frameBorder*2, 1);
		
		this.frame.repaint();
	};
	
	BaseFrame.prototype.resizeMain = function resizeMain() { };
	
	BaseFrame.prototype.resizeEdge = function resizeEdge() { };
	
	BaseFrame.prototype.addComp = function addComp(compId, compObj, subComp) {
		if (subComp !== true) this.frame.add(compObj);
		this.compList[compId] = compObj;
	};
	
	BaseFrame.prototype.removeComp = function removeComp(compId) {
		if (this.compList[compId]) this.compList[compId] = null;
	};
	
	BaseFrame.prototype.show = function show() {
		this.frame.setVisible(true);
	};

	BaseFrame.prototype.hide = function hide() {
		this.frame.setVisible(false);
	};
	
	BaseFrame.prototype.minimize = function minimize() {
		if (this.allowMinimize == false) return;
		this.frame.setSize(this.titleLength+16, this.topBarHeight+this.frameBorder);
		this.compList['baseMinMax'].setText("_");
		this.compList['baseMinMax'].setVisible(false);
		this.compList['baseClose'].setVisible(false);
		this.compList['baseResize'].setVisible(false);
	};

	BaseFrame.prototype.maximize = function maximize() {
		this.frame.setSize(this.bounds.width, this.bounds.height);
		this.compList['baseMinMax'].setText("-");
		this.compList['baseMinMax'].setVisible(true);
		this.compList['baseClose'].setVisible(true);
		this.compList['baseResize'].setVisible(true);
	};

	BaseFrame.prototype.fold = function fold() {
		if (this.allowFold == false) return;
		this.frame.setSize(this.frame.getWidth(), this.topBarHeight+this.frameBorder);
		this.compList['baseMinMax'].setText("+");
		this.compList['baseResize'].setVisible(false);
	};	
	
	BaseFrame.prototype.getSize = function getSize() {
		return ({width: this.bounds.width, height: this.height});
	};
	
	BaseFrame.prototype.setSize = function setSize(width, height) {
		this.bounds.width = width;
		this.bounds.height = height;
		this.frame.setSize(width, height);
	};
	
	BaseFrame.prototype.setColor = function setColor(color) {
		this.frame.setBackground(windowColors[color]);
		this.color = color;
	};

	BaseFrame.prototype.setTitle = function setTitle(title) {	
		if (typeof title == 'undefined') return;
		
		this.title = title;
		var font = new Font("Trebuchet MS", Font.BOLD, 17);
		this.titleLength = this.stringLength(title, font);
		this.compList['baseTitle'].setText(title);
		this.frameMinWidth = this.titleLength + 60 > this.frameMinWidth ? this.titleLength + 60 : this.frameMinWidth;
		
	};
	
	BaseFrame.prototype.findFrame = function findFrame() {
		var oldFrame = null;
		var windows = JFrame.getWindows()
		for (inc in windows) {
			try {	
				if (windows[inc].getTitle() == String(this.title)) {
					oldFrame = (windows[inc]); 
				}
			}
			catch(e) { }			
		}
		return oldFrame;
	};
	
	BaseFrame.prototype.centerFrame = function centerFrame() {
		var screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		this.frame.setBounds((screenSize.getWidth()-this.bounds.width)/2, (screenSize.getHeight()-this.bounds.height)/2, this.bounds.width, this.bounds.height);	
	};

	BaseFrame.prototype.stringLength =  function stringLength(str, font) {	
		
		var g = this.frame.getGraphics();
		font = (font instanceof Font) ? font : new Font("Trebuchet MS", Font.BOLD, 15);
		var metrics = g.getFontMetrics(font);
		g.dispose();
		return metrics.stringWidth(String(str));
	};
	
	BaseFrame.prototype.kill = function kill() {
		try {
			removeGlobal(this.globalId);
			this.finalize();
			while (this.findFrame(this.title)) {
				var oldFrame = this.findFrame(this.title);
				oldFrame.setDefaultCloseOperation(JFrame.DISPOSE_ON_CLOSE);
				oldFrame.setTitle("kill");
				oldFrame.setVisible(false);
				oldFrame.dispose();
				oldFrame = null;
				
			}
			if (oldFrame === null) return true;
			return false;
		}
		catch(e) {
			printError("Kill Frame", e);
		}
	};
	
	BaseFrame.prototype.loadSettings = function loadSettings() {
		var cfg = loadConfigKey(String(this.globalId + 'Window')) == false ? false : String(loadConfigKey(String(this.globalId + 'Window'))).split(',');
		if (cfg != false) {
			//print("Config = " + cfg);
			this.frame.setBounds(cfg[0], cfg[1], cfg[2], cfg[3]);
			this.setColor(cfg[4]);
			this.bounds = {x:cfg[0], y:cfg[1], width:cfg[2],height: cfg[3]};
			this.resizeBase();
			this.resizeMain();
			this.compList['baseMinMax'].setText(cfg[5]);
			
			switch (cfg[5]) {
				case ("+"):
					this.fold();
					break;
				case ("="):
					
					break;					
				case ("-"):
					
					break;				
				case ("_"):
					this.minimize();
					break;
			}			
		
		}
		
	};
	
	BaseFrame.prototype.saveSettings = function saveSettings() {
	
		var saveStr = String(
			this.bounds.x + "," +
			this.bounds.y + "," +
			this.bounds.width + "," +
			this.bounds.height + "," +
			this.color + "," +
			this.compList['baseMinMax'].getText()
		);
		saveConfigKey(String(this.globalId + 'Window'), saveStr); 
	
	};
	
	BaseFrame.prototype.fadeColor = function fadeColor(obj, objFunc, clrStart, clrEnd, timeMs) {
		
		try {
		
			var cycleTime = 20;
			var cycles = timeMs/cycleTime;
			
			var rStep = (clrEnd.getRed() - clrStart.getRed()) / cycles/255;
			var gStep = (clrEnd.getGreen() - clrStart.getGreen()) / cycles/255;
			var bStep = (clrEnd.getBlue() - clrStart.getBlue()) / cycles/255;
			var aStep = (clrEnd.getAlpha() - clrStart.getAlpha()) / cycles/255;
			
			for (var cycleInc = 0; cycleInc <= cycles; cycleInc++) {
				
				delayAction( function(delayInc) {
						var rNew = Math.max(0, Math.min(1, (clrStart.getRed()/255 + rStep * delayInc)));
						var gNew = Math.max(0, Math.min(1, (clrStart.getGreen()/255 + gStep * delayInc)));
						var bNew = Math.max(0, Math.min(1, (clrStart.getBlue()/255 + bStep * delayInc)));
						var aNew = Math.max(0, Math.min(1, (clrStart.getAlpha()/255 + aStep * delayInc)));
						var clrNew = new Color(rNew, gNew, bNew, aNew);
						objFunc.call(obj, clrNew);
						
				}, cycleInc, cycleInc*cycleTime);
				
			}
		}
		catch(e) {
			printError("Frame fadeColor", e);
		}
	};
	
}

var DebugFrame = function DebugFrame() {}; {
	
	DebugFrame.prototype = new BaseFrame();
	DebugFrame.prototype.loader = DebugFrame;
	DebugFrame.prototype.title = "Debug";
	DebugFrame.prototype.color = windowColors.blue;
	DebugFrame.prototype.globalId = '$debug';	
	DebugFrame.prototype.horizontalGap = 4;
	DebugFrame.prototype.textPanelLeftSize = .2;
	DebugFrame.prototype.commandTextHeight = 24;
	DebugFrame.prototype.commandHistory = [];
	DebugFrame.prototype.commandIndex = -1;
	DebugFrame.prototype.contextHistory = [];
	
	DebugFrame.prototype.buildMain = function buildMain() {
		var timeStart = new Date().getTime();
		var screenSize = Toolkit.getDefaultToolkit().getScreenSize();
		var frameWidth = this.frame.getSize().getWidth();
		var frameHeight = this.frame.getSize().getHeight();
		var commandTextHeight = this.commandTextHeight;
		var textPanelLeftSize = this.textPanelLeftSize;
		var horizontalGap = this.horizontalGap;
		var topBarHeight  = 26;
		var frameBorder = 4;
		var printLeft = this.printLeft;
		var printRight = this.printRight;
		var pointer = this.obj;
		
		var textPaneLeft = new JTextPane();
		textPaneLeft.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textPaneLeft.setEditable(true);
		textPaneLeft.setOpaque(true);
		textPaneLeft.setBorder(BorderFactory.createLineBorder(windowColors.white, 5));
		
		var caret = textPaneLeft.getCaret();
		caret.setUpdatePolicy(javax.swing.text.DefaultCaret.NEVER_UPDATE);
		
		var scrollPaneLeft = new JScrollPane(textPaneLeft, ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS, ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		scrollPaneLeft.add(textPaneLeft);
		scrollPaneLeft.getViewport().add(textPaneLeft);
		scrollPaneLeft.getViewport().setOpaque(false);
		scrollPaneLeft.getViewport().setBackground(windowColors.clear);
		scrollPaneLeft.setOpaque(false);
		scrollPaneLeft.setBackground(windowColors.clear);
		scrollPaneLeft.setBorder(null);
		
		var textPaneRight = new JTextPane();
		textPaneRight.setFont(new Font("Tahoma", Font.PLAIN, 15));
		textPaneRight.setEditable(true);
		textPaneRight.setBorder(null);
		textPaneRight.setBorder(BorderFactory.createCompoundBorder((BorderFactory.createLineBorder(windowColors.clear)), BorderFactory.createEmptyBorder(4, 4, 4, 4)));
		
		var scrollPaneRight = new JScrollPane(textPaneRight, ScrollPaneConstants.VERTICAL_SCROLLBAR_ALWAYS, ScrollPaneConstants.HORIZONTAL_SCROLLBAR_AS_NEEDED);
		scrollPaneRight.add(textPaneRight);
		scrollPaneRight.getViewport().add(textPaneRight);			
		scrollPaneRight.getViewport().setOpaque(false);
		scrollPaneRight.getViewport().setBackground(windowColors.clear);
		scrollPaneRight.setOpaque(false);
		scrollPaneRight.setBackground(windowColors.clear);
		scrollPaneRight.setBorder(null);
		//scrollPaneRight.setBorder(BorderFactory.createCompoundBorder((BorderFactory.createLineBorder(windowColors.lightWeak)), BorderFactory.createEmptyBorder(1, 1, 1, 1)));
		var caret = textPaneRight.getCaret();
		caret.setUpdatePolicy(javax.swing.text.DefaultCaret.NEVER_UPDATE);
		
		var textCommandInput = new JTextPane();
		textCommandInput.setName("debugTextRight");
		textCommandInput.setFont(new Font("Tahoma", Font.PLAIN, 14));
		textCommandInput.setEditable(true);
		textCommandInput.setBorder(null);
		var caret = textCommandInput.getCaret().setUpdatePolicy(javax.swing.text.DefaultCaret.UPDATE_WHEN_ON_EDT );
		
		//textCommandInput.setBorder(BorderFactory.createCompoundBorder((BorderFactory.createLineBorder(windowColors.white)), BorderFactory.createEmptyBorder(6, 6, 6, 6)));
		
		//var doc = textCommandInput.getStyledDocument();
		//var style = textCommandInput.addStyle("tmpStyle", null);
		//javax.swing.text.StyleConstants.setForeground(style, Color.blue);
		//javax.swing.text.StyleConstants.setBackground(style, windowColors['darkStrong']);
		//javax.swing.text.StyleConstants.setSubscript(style, true);
		//try { doc.insertString(doc.getLength(), "Awww",style); } catch (e){}
		
		
		//textCommandInput.setToolTipText("Enter a game command, or a js command with @");
		//javax.swing.ToolTipManager.setInitialDelay(0);
		
		var scrollPaneInput = new JScrollPane(textCommandInput, ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER, ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		scrollPaneInput.add(textCommandInput);
		scrollPaneInput.getViewport().add(textCommandInput);			
		scrollPaneInput.getViewport().setOpaque(true);
		scrollPaneInput.getViewport().setBackground(windowColors.white);
		scrollPaneInput.setOpaque(true);
		scrollPaneInput.setBackground(windowColors.white);
		scrollPaneInput.setBorder(null);
		scrollPaneInput.setBorder(BorderFactory.createCompoundBorder((BorderFactory.createLineBorder(windowColors.white, 2)), BorderFactory.createEmptyBorder(3, 0, 0, 0)));

		var midSeperator = new JSeparator(SwingConstants.VERTICAL);
		midSeperator.setBackground(windowColors.clear);
		midSeperator.setForeground(windowColors.clear);
		midSeperator.border = null;	
		midSeperator.setCursor(new java.awt.Cursor(java.awt.Cursor.W_RESIZE_CURSOR));
		
		var lastPt = { x:-1, y:-1, xWin:-1, yWin:-1 }
		midSeperator.addMouseMotionListener(new java.awt.event.MouseMotionListener(){		// mid gap ; resize scrollpanes
			mouseMoved: function (evt) {
				
				if (lastPt.x > 0)	 {
					lastPt.x = -1; 
					lastPt.y = -1; 
					lastPt.xWin = -1; 
					lastPt.yWin = -1;
				}
			},
			mouseDragged: function (evt) {
				try {
					if (lastPt.x < 0)	 {
						lastPt.x = evt.getXOnScreen();
						lastPt.y = evt.getYOnScreen();
						var windowLoc = pointer.frame.getLocation();
						lastPt.xWin = windowLoc.getX();
						lastPt.yWin = windowLoc.getY();
						return;
					}
					pointer.textPanelLeftSize = (evt.getXOnScreen()-pointer.frame.getLocation().getX()) / (pointer.bounds.width+pointer.frameBorder*2+horizontalGap*.5);
					pointer.textPanelLeftSize = Math.min(Math.max(pointer.textPanelLeftSize, .05), .95);
					pointer.resizeMain.call(pointer);
					pointer.show();
				}
				catch(e) {
					player.print("Mouse Error: " + e);
				}
			}
		});		
		
		textCommandInput.addKeyListener(new java.awt.event.KeyListener{			// command text input key listener
			keyPressed: function(evt) {
				if (evt.getKeyCode() == 38) pointer.recallCommand.call(pointer, -1);		//Up arrow key
				if (evt.getKeyCode() == 40) pointer.recallCommand.call(pointer, 1);		//Down Arrow key and Tab Key
				
			//pointer.printRight.call(pointer, "pressed = " + evt);
				//if (evt.getKeyCode() == 10) pointer.printRight.call(pointer, "\n\nYou hit enter \n\n");
			},
			keyReleased: function(evt) {
				//pointer.printRight.call(pointer, " released = " + evt);
				if (evt.getKeyCode() == 9) {					// Tab Key
					pointer.recallCommand.call(pointer, 1);
					pointer.sendCommand.call(pointer);
				}
				if (evt.getKeyCode() == 10) pointer.sendCommand.call(pointer);		//Enter key

			},
			keyTyped: function(evt) {
				//pointer.printRight.call(pointer, "typed = " + evt);
					
			}});	
		
		textPaneRight.addMouseListener(new java.awt.event.MouseListener(){		// right scroll pane - double click ; select / lookup word
			mouseClicked: function(evt) {
				var timeNow = new Date().getTime();
				if (timeNow - timeStart < 200) {
					var tmp = pointer.compList['debugRightText'].getSelectedText();
					pointer.compList['debugCommandInput'].setText("?" + tmp);
					//pointer.sendCommand();
				}
				timeStart = timeNow;
			},
		});	



		this.addComp('debugLeftText', textPaneLeft, true);
		this.addComp('debugRightText', textPaneRight, true);
		this.addComp('debugCommandInput', textCommandInput, true);
		this.addComp('debugLeftScroll', scrollPaneLeft);
		this.addComp('debugRightScroll', scrollPaneRight);
		this.addComp('debugInputScroll', scrollPaneInput);
		this.addComp('debugMidGap', midSeperator);
		this.compList['debugCommandInput'].requestFocus();
		this.frame.repaint();
		
	};

	DebugFrame.prototype.resizeMain = function resizeMain() {
		
		var fWidth = this.frame.getWidth();
		var fHeight = this.frame.getHeight();
		
		this.compList['debugLeftScroll'].setBounds(this.frameBorder, this.topBarHeight+this.frameBorder, Math.round(fWidth * this.textPanelLeftSize), fHeight - (this.topBarHeight + this.frameBorder*2));
		this.compList['debugRightScroll'].setBounds(Math.round(fWidth * this.textPanelLeftSize)+this.horizontalGap+this.frameBorder, this.topBarHeight+this.frameBorder, fWidth-(Math.round(fWidth * this.textPanelLeftSize)+this.horizontalGap+this.frameBorder*2), Math.round((fHeight - (this.commandTextHeight + this.frameBorder*3 + this.topBarHeight))));
		this.compList['debugInputScroll'].setBounds(Math.round(fWidth * this.textPanelLeftSize)+this.horizontalGap+this.frameBorder,fHeight-this.commandTextHeight-this.frameBorder, fWidth-(Math.round(fWidth * this.textPanelLeftSize)+this.horizontalGap+this.frameBorder*2), this.commandTextHeight);
		this.compList['debugMidGap'].setBounds(Math.round(fWidth * this.textPanelLeftSize)+this.frameBorder, this.topBarHeight+this.frameBorder, this.horizontalGap, fHeight-(this.topBarHeight+this.frameBorder*2));

		this.frame.repaint();
	};

	DebugFrame.prototype.resetInput = function resetInput() {
		this.compList['debugCommandInput'].setText(null);
		this.compList['debugCommandInput'].requestFocus();
	};
	
	DebugFrame.prototype.printLeft = function printLeft(str) {
		var leftPane = this.compList['debugLeftText'];
		
		if (typeof str === 'object') {
			var objStr = ObjToStr(str);
			leftPane.setText(objStr);			
		}
		else { 
			leftPane.setText(str + "\n" + leftPane.text); 
		}
	};
	
	DebugFrame.prototype.printRight = function printRight(str, color, newline) {
		//player.print(">>>>>>>>>>>>>>>>>>>>>>>" + str + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
		
		color = color instanceof Color == false ? Color.red : color; 		
		newLine = typeof newLine == 'undefined' || newLine == true ? "\n" : ""; 
		
		var doc = this.compList['debugRightText'].getStyledDocument();
		var style = this.compList['debugRightText'].addStyle("debugPrintStyle", null);
		javax.swing.text.StyleConstants.setForeground(style, color);
		
		//javax.swing.text.StyleConstants.setBackground(style, windowColors['darkStrong']);
		//javax.swing.text.StyleConstants.setSubscript(style, true);
		
		try { doc.insertString(0 /*doc.getLength()*/, str + newLine, style); } catch (e){}
		
		//var rightPane = this.compList['debugRightText'];
		//rightPane.setText(str + newLine + rightPane.text );
	};

	DebugFrame.prototype.sendCommand = function sendCommand() {

		org.mozilla.javascript.Context.getCurrentContext().getFactory().enterContext();
		var comStr = String(this.compList['debugCommandInput'].getText()).replace('\r', "").replace('\n', "");
		
		this.compList['debugCommandInput'].setText(null);
		this.compList['debugCommandInput'].requestFocus();		
		
		if (comStr.length > 0) {
					
			var tmpStr = String(comStr).slice(0, 1).toLowerCase();
			switch(tmpStr) {
				case ("#"):
					comStr = "/cs build #";
					sendGameCommand(comStr);
					break;
				case ("@"):
					comStr = String(comStr).slice(0);
					this.sendContext(comStr.slice(1));
					break;
				case ("$"):
					comStr = String(comStr).slice(0);
					var jStr = String(comStr).slice(1)
					//var file = context.getSafeFile("craftscripts", "jTest.js");
					//jStr = loadFile(file, 2);
					this.sendContext(jStr, global);
					break;
				case ("?"):
					this.sendContext('if (typeof ' +  String(comStr).slice(1) + ' == "object") $debug.printRight(ObjToStr(' +  
						String(comStr).slice(1) + ')); else $debug.printRight("#### [' +  String(comStr).slice(1) + '] = { " + ' +  
						String(comStr).slice(1) + ' + " }" );', global);
					break;					
				default:
					sendGameCommand(comStr);
			}
			
			
			
			
			this.printLeft(">" + comStr);
			if (this.commandHistory[0] !== comStr) this.commandHistory.unshift(comStr);		
			this.commandIndex = -1;
		}

	};

	DebugFrame.prototype.recallCommand = function recallCommand(shiftVal) {
		if (this.commandIndex+shiftVal == -1) {
			this.commandIndex  = -1;
			this.compList['debugCommandInput'].setText("");
		}
		else if (this.commandHistory[this.commandIndex+shiftVal]) {
			this.commandIndex  += shiftVal;
			this.compList['debugCommandInput'].setText(this.commandHistory[this.commandIndex]);
		}
		
	};

	DebugFrame.prototype.sendContext = function sendContext(jStr) {
	
		this.printRight("### Javascript File Finished", Color.red);
		runJScript(jStr);
		this.printRight("### Javascript File Ran: { " + jStr + " }", Color.red);
	};	
}

var MapFrame = function MapFrame() {}; {

	MapFrame.prototype = new BaseFrame();
	MapFrame.prototype.globalId = '$map';
	MapFrame.prototype.loader = MapFrame;	
	MapFrame.prototype.title = "Map Viewer";
	MapFrame.prototype.color = windowColors.darkStrong;
	MapFrame.prototype.imageObj = null;
	MapFrame.prototype.arrowImage = null;
	MapFrame.prototype.mapArray = null;
	MapFrame.prototype.imageCenterVec = player.getBlockIn();
	MapFrame.prototype.imageVec = player.getPosition();
	MapFrame.prototype.mapSize = {}
	MapFrame.prototype.viewSize = {};
	MapFrame.prototype.mapScale = 1;
	MapFrame.prototype.heightShading = true;
	MapFrame.prototype.autoUpdate = true;
	MapFrame.prototype.waypoints = [];
	
	MapFrame.prototype.buildMain = function buildMain() {
		try {
	
			var pointer = this.obj;
			this.mapSize =  this.mapSize = {} ? {width: 256, height: 256} : this.mapSize;
			this.viewSize = this.viewSize = {} ? {width: 256, height: 256} : this.viewSize;
			
			// Create a new blank cursor.
			var cursorImg = new BufferedImage(16, 16, BufferedImage.TYPE_INT_ARGB);
			var blankCursor = Toolkit.getDefaultToolkit().createCustomCursor( cursorImg, new Point(0, 0), "blank cursor"); 
			
			var imgLabel = new JLabel(); /*{
				paintComponent: function(g) {
					
					pointer.drawMap.call(pointer);
				
				}
			}; */
			
			imgLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.CROSSHAIR_CURSOR ));
			imgLabel.setCursor(blankCursor);
			imgLabel.setHorizontalAlignment (JLabel.CENTER);
			
			var overlayLabel = new JLabel();
			overlayLabel.setOpaque(false);
			overlayLabel.setBackground(windowColors.clear);
			overlayLabel.setCursor(blankCursor);
			
			var waypointLabel = new JLabel();
			waypointLabel.setOpaque(false);
			waypointLabel.setBackground(windowColors.clear);
			waypointLabel.setCursor(blankCursor);			
				
			var vecLabel = new JLabel("");
			vecLabel.setHorizontalAlignment (JLabel.CENTER)
			vecLabel.setOpaque(true);
			vecLabel.setFont(new Font("Trebuchet MS", Font.BOLD, 14));
			vecLabel.setForeground(windowColors.white);
			vecLabel.setBackground(windowColors.darkStrong);
			vecLabel.setCursor(blankCursor);
			
			var arrowLabel = new JLabel();
			arrowLabel.setOpaque(false);
			arrowLabel.setBackground(windowColors.clear);
			arrowLabel.setCursor(blankCursor);
			
			imgLabel.addMouseListener(new java.awt.event.MouseListener(){	//  map image ; click and press event listeners
				mouseClicked: function (evt) {
					pointer.mapMouseClick.call(pointer, evt);
				},
				mouseReleased: function (evt) {
					//pointer.mapRefresh.call(pointer);
				}
			});				
			
			imgLabel.addMouseMotionListener(new java.awt.event.MouseMotionListener(){	//  map image ; mouse move and drag listener
				mouseMoved: function (evt) {
					pointer.mapMouseMove.call(pointer, evt);
				},
				mouseDragged: function (evt) {
					pointer.mapMouseDrag.call(pointer, evt);
				}
			});			
			
			imgLabel.addMouseWheelListener(new java.awt.event.MouseWheelListener() {		//  map image ; mouse wheel scroll listerner / zoom 
				mouseWheelMoved: function(evt) {
				if(evt.getScrollType() == java.awt.event.MouseWheelEvent.WHEEL_UNIT_SCROLL) {
						var wheelInc = evt.getWheelRotation() < 0 ? -.1: .1;
						pointer.mapScale -= wheelInc;
						pointer.resizeMain();						
						pointer.buildGameMap();
					}
				}
			});
			
			this.obj.setSize(this.viewSize.width+this.frameBorder*2, this.viewSize.height+this.topBarHeight+this.frameBorder*2);
			this.bounds.width = this.viewSize.width+this.frameBorder*2;
			this.bounds.height = this.viewSize.height+this.topBarHeight+this.frameBorder*2;
			
			this.addComp('mapCoords', vecLabel);
			this.addComp('mapArrow', arrowLabel);
			this.addComp('mapWaypoints', waypointLabel);
			this.addComp('mapOverlay', overlayLabel);
			this.addComp('mapImage', imgLabel);			
				
			//this.obj = this;
			delayAction(function (pointer) { pointer.buildGameMap.call(pointer); }, pointer, 1);
			this.setAutoUpdate(true);
		}
		catch (e) {
			printError("MapFrame Error", e);
		
		}
	};

	MapFrame.prototype.resizeMain = function resizeMain() {

		//this.mapScale = Math.min((this.bounds.width-8)/this.viewSize.width, (this.bounds.height-32)/this.viewSize.height);
		
		//this.bounds.width = Math.min((this.viewSize.width*this.mapScale+8), (this.viewSize.height*this.mapScale+8));
		//this.bounds.height = Math.min((this.viewSize.width*this.mapScale+32), (this.viewSize.height*this.mapScale + 32));
		//this.frame.setSize(this.bounds.width, this.bounds.height) ;
		//this.resizeBase();
		
		this.compList['mapImage'].setBounds(this.frameBorder,this.topBarHeight+this.frameBorder,this.bounds.width-this.frameBorder*2, this.bounds.height-(this.topBarHeight+this.frameBorder*2));
		this.compList['mapOverlay'].setBounds(this.frameBorder,this.topBarHeight+this.frameBorder,this.bounds.width-this.frameBorder*2, this.bounds.height-(this.topBarHeight+this.frameBorder*2));
		this.compList['mapWaypoints'].setBounds(this.frameBorder,this.topBarHeight+this.frameBorder,this.bounds.width-this.frameBorder*2, this.bounds.height-(this.topBarHeight+this.frameBorder*2));
		this.compList['mapArrow'].setBounds(this.bounds.width/2-16,(this.bounds.height-32)/2+this.topBarHeight/2 ,32, 32);
		this.compList['mapCoords'].setBounds(this.frameBorder, this.bounds.height-20, (this.compList['mapCoords'].getSize().getWidth()), (this.compList['mapCoords'].getSize().getHeight()) )
		
		if (this.obj.mapArray == null) return; 
		this.viewSize.width = this.frame.getWidth()-(this.frameBorder*2);
		this.viewSize.height = this.frame.getHeight()-(this.topBarHeight+this.frameBorder*2);		
		
		printDebug("this.viewSize.width", this.viewSize.width);
		printDebug("this.viewSize.height", this.viewSize.height);
		//this.compList['mapArrow'].setBounds(this.bounds.width/2-16,this.viewSize.height/2+this.topBarHeight-14 ,32, 32);		
		
		//this.mapScale = Math.min(this.frame.getWidth()-8, this.frame.getHeight()) / Math.min(this.viewSize.height, this.viewSize.width)


		//printDebug("this.viewSize.width", this.viewSize.width);
		//printDebug("this.viewSize.height", this.viewSize.height);
		//this.drawGameMap();

	};

	MapFrame.prototype.reloadMain = function reloadMain() { return new MapFrame(); };
	
	MapFrame.prototype.finalize = function finalize() {
		try {
			this.updateTimer.cancel();
		}
		catch(e) {}
		finally{
			this.updateTimer = [];
			this.imageObj= [];
			this.mapArray = [];
			this.updateList= [];
		}	
	};
	
	MapFrame.prototype.buildGameMap = function buildGameMap(vec) {
	
		try {
			vec = typeof vec == 'undefined' ? player.getBlockIn() : vec;
			this.imageCenterVec = vec;
			
			var img = new BufferedImage(this.viewSize.width, this.viewSize.height, BufferedImage.TYPE_INT_RGB);
			
			if (this.obj.mapArray == null) {
				
				var vecStart = new Vector(vec.getX()-Math.round(this.viewSize.width/2), 0, vec.getZ()-Math.round(this.viewSize.height/2));
				var vecEnd = new Vector(vec.getX()+Math.round(this.viewSize.width/2), 255, vec.getZ()+Math.round(this.viewSize.height/2));		
				var iArray = new Array();
				iArray = generateSurfaceImage(vecStart, vecEnd, this.heightShading, true);
				this.mapArray = iArray;
				iArray = null;
			
				var baseVec = Vector(Math.round(this.imageCenterVec.getX()-this.viewSize.width/2), 1, Math.round(this.imageCenterVec.getZ()-this.viewSize.height/2));
				for (var x = 0; x < this.viewSize.width; x++) {
					for (var y = 0; y < this.viewSize.height; y++) {
						var gameVec = baseVec.add(x,0,y);
						if (typeof (this.mapArray[(gameVec.getX())]) != 'undefined' && typeof(this.mapArray[(gameVec.getX())][(gameVec.getZ())]) != 'undefined') {
							img.setRGB(x, y, this.mapArray[(gameVec.getX())][(gameVec.getZ())]);
						
						}
						else {
							print("Warning: [undefined] in initial mapGen");
							if (typeof (this.obj.mapArray[(gameVec.getX())]) == 'undefined') this.obj.mapArray[(gameVec.getX())] = new Array();
							//var tmpVec = new Vector(gameVec.getX(), 0, (gameVec.getZ()));
							var tmpColor = generateSurfaceImage(gameVec, gameVec, this.heightShading, true);
							tmpColor = typeof tmpColor == 'undefined' ? getColor(255,1,1) :tmpColor;
							img.setRGB(x, y, tmpColor);
							this.obj.mapArray[(gameVec.getX())][(gameVec.getZ())] = tmpColor;
						}
					}
				}			
			}
			else {
				var gap = {x: (this.viewSize.width-this.mapSize.width)/2 , y: (this.viewSize.height-this.mapSize.height)/2 }
		 		var baseVec = Vector(Math.round(this.imageCenterVec.getX()-this.viewSize.width/2), 1, Math.round(this.imageCenterVec.getZ()-this.viewSize.height/2));
				for (var x = 0; x < this.viewSize.width; x++) {
					for (var y = 0; y < this.viewSize.height; y++) {
						var gameVec = baseVec.add(x,0,y);
						
						if (typeof (this.obj.mapArray[(gameVec.getX())]) != 'undefined' && typeof(this.obj.mapArray[(gameVec.getX())][(gameVec.getZ())]) != 'undefined') {
							try {
								img.setRGB(x, y, this.obj.mapArray[(gameVec.getX())][(gameVec.getZ())]);
							}
							catch(e) {
								img.setRGB(x, y, getColor(255,1,1));
							};
						
						}
						else if ((x >= gap.x && x <= this.viewSize.width-gap.x) && (y >= gap.y && y <= this.viewSize.width-gap.y)) {

							if (typeof (this.obj.mapArray[(gameVec.getX())]) == 'undefined') this.obj.mapArray[(gameVec.getX())] = new Array();
							var tmpColor = generateSurfaceImage(gameVec, gameVec, true, true);
							tmpColor = typeof tmpColor == 'undefined' || tmpColor == null ? getColor(255,1,1) : tmpColor;
							img.setRGB(x, y, tmpColor);
							this.obj.mapArray[(gameVec.getX())][(gameVec.getZ())] = tmpColor;

						}
						else {
							//var tmpColor = typeof tmpColor == 'undefined' || tmpColor == null ? getColor(255,1,1) : tmpColor;
							img.setRGB(x, y, getColor(0,0,0));
						}
					}
				}
			}
			
			this.imageObj = img;
			this.drawGameMap();
			img = null;
		
		}
		catch (e) {
			printError("drawMap", e);
		}
	}

	MapFrame.prototype.drawGameMap = function drawGameMap() {
		
		if (this.imageObj == null) return;
		var newWidth = new java.lang.Double(this.imageObj.getWidth() * this.mapScale).intValue();
		var newHeight = new java.lang.Double(this.imageObj.getHeight() * this.mapScale).intValue();
		var tmpImg = new BufferedImage(newWidth, newHeight, this.imageObj.getType());
		var g = tmpImg.createGraphics();
		//var g = this.compList['mapImage'].getGraphics();
		
		g.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g.drawImage(this.imageObj, 0, 0, newWidth, newHeight, (this.viewSize.width-this.imageObj.getWidth())/2, (this.viewSize.height-this.imageObj.getHeight())/2, this.imageObj.getWidth(), this.imageObj.getHeight(), null);
		g.dispose();
		//this.compList['mapImage'].repaint();

		this.compList['mapImage'].setIcon(ImageIcon(tmpImg));
		tmpImg = null;
	}
	
	MapFrame.prototype.updateMapArea = function updateMapArea(vec, size) {
	
		var pointer = this.obj;
			try {
				var baseVec = Vector(Math.round(vec.getX()-size/2), 1, Math.round(vec.getZ()-size/2));
				for (var x = 0; x < size; x++) {
					for (var z = 0; z < size; z++) {
						var gameVec = baseVec.add(x,0,z);
						
						if (typeof (pointer.obj.mapArray[(gameVec.getX())]) == 'undefined') pointer.obj.mapArray[(gameVec.getX())] = new Array();
						var tmpVec = new Vector(gameVec.getX(), 0, (gameVec.getZ()));
						var tmpColor = generateSurfaceImage(tmpVec, tmpVec, true, true);
						pointer.mapArray[(gameVec.getX())][(gameVec.getZ())] = tmpColor;			
					}
				}		
			}
			catch (e) {
				printError("Map Update Area", e);
			
			}	
	};
	
	MapFrame.prototype.refreshMapArea = function refreshMapArea(vec, size) {
		
		//var g = this.imageObj.getGraphics();
		//g.setColor(new Color(0, 0, 0, .1));
		try {
			var baseVec = Vector(Math.round(vec.getX()-size/2), 1, Math.round(vec.getZ()-size/2));
			for (var x = 0; x < size; x++) {
				for (var z = 0; z < size; z++) {
					var gameVec = Vector(this.imageCenterVec.getX()-this.viewSize.width/2+baseVec.getX()+x, 1, this.imageCenterVec.getZ()-this.viewSize.height/2+baseVec.getZ()+z);
					if (typeof (this.obj.mapArray[(gameVec.getX())]) == 'undefined') continue; 
					if (typeof (this.obj.mapArray[(gameVec.getX())][(gameVec.getZ())]) == 'undefined') continue;
					if (baseVec.getX()+x < 0 || baseVec.getX()+x >= this.viewSize.width) continue;
					if (baseVec.getZ()+z < 0 || baseVec.getZ()+z >= this.viewSize.width) continue;	
					this.imageObj.setRGB(baseVec.getX()+x, baseVec.getZ()+z, (this.obj.mapArray[(gameVec.getX())][(gameVec.getZ())]));			
				}
			}
		/* 	var tmpImg = new BufferedImage(this.viewSize.width, this.viewSize.height, BufferedImage.TYPE_INT_RGB);
			var g2d = tmpImg.createGraphics();
			var at = new java.awt.geom.AffineTransform();
			at.translate(this.imageObj.getWidth()/2, this.imageObj.getHeight()/2);
			at.scale(this.mapScale, this.mapScale);
			at.translate(-this.imageObj.getWidth()/2, -this.imageObj.getHeight()/2);
			g2d.drawImage(this.imageObj, at, null);
			g2d.dispose();
			
			this.compList['mapImage'].setIcon(ImageIcon(tmpImg));
			
			//this.frame.repaint();
			 */
			this.drawGameMap();
		}
		catch (e) {
			printError("Map Update Area", e);
		
		}			

	};

	MapFrame.prototype.setAutoUpdate = function setAutoUpdate(status) {
	
		try {
			if (status === true) {
				if (this.updateTimer != null) {
					this.updateTimer.cancel();
					this.updateTimer = null;
				}
				this.updateTimer = new Timer();
				
				var pointer = this.obj;
				var mapRefreshTask = new TimerTask() {
					mapPointer: pointer,
					run : function() {
						try {
							this.mapPointer.mapRefresh();
							
							if (org.lwjgl.input.Keyboard.isKeyDown(207)) {
								print("mapRefreshTask Canceled");
								this.cancel();
							}
							if (org.lwjgl.input.Keyboard.isKeyDown(199)) {
								this.mapPointer.show();
							}							
						}
						catch(e) {
							printError("Map RefreshTask", e);
						}
					}
				};
				this.updateTimer.schedule(mapRefreshTask, 1, 20);
				
			}
			else {
				if (this.updateTimer != null) {
					player.print("Stopping Map Timer");
					this.updateTimer.cancel();
					this.updateTimer = null;
				}
			}
		}
		catch(e) {
			printError("Map autoUpdate", e);
		}
	};

	MapFrame.prototype.updateCoords = function updateCoords(x, z) {
		
		if (typeof x == 'undefined' || typeof z == 'undefined') {
			var gameVec = player.getBlockIn();
		}
		else {
			var gameVec = Vector(this.imageCenterVec.getX()-this.viewSize.width/2+x, 1, this.imageCenterVec.getZ()-this.viewSize.height/2+z);
		}
		var vecStr = String("[ "+ gameVec.getX() + ", " + gameVec.getZ() + " ]");
		var g = this.imageObj.getGraphics();
		var gFont = new Font("Trebuchet MS", Font.BOLD, 14);
		g.setFont(gFont);
		var metrics = g.getFontMetrics(gFont);
		var textLength = metrics.stringWidth(vecStr);
		var textHeight = metrics.getHeight();

		this.compList['mapCoords'].setBounds(3, this.bounds.height-20, textLength+6,textHeight+3);
		this.compList['mapCoords'].setText(vecStr);	
	};
	
	MapFrame.prototype.updateArrow = function updateArrow() {

		var ang = parseInt((getDirection().yaw + 180) % 360);
		var aScale = 2;
	
		if (this.arrowImage == null) {
			var center = {'x': 16, 'y': 16};
			var centerVec = Vector(center.x, 0, center.y);
			var arrow = {
				left: Vector(center.x-4*aScale, 0, center.y+6*aScale),
				top: Vector(center.x, 0, center.y-6*aScale),
				'right': Vector(center.x+4*aScale, 0, center.y+6*aScale),
				'bottom': Vector(center.x, 0, center.y+2*aScale)
			}
			
			var arrowBack = {
				left: Vector(center.x-5*aScale, 0, center.y+7*aScale),
				top: Vector(center.x, 0, center.y-7*aScale),
				'right': Vector(center.x+5*aScale, 0, center.y+7*aScale),
				'bottom': Vector(center.x, 0, center.y+3*aScale)
			}				
			
			var arrowBackX = [arrowBack.left.getX(), arrowBack.top.getX(), arrowBack.right.getX(), arrowBack.bottom.getX(), arrowBack.left.getX()];
			var arrowBackY = [arrowBack.left.getZ(), arrowBack.top.getZ(), arrowBack.right.getZ(), arrowBack.bottom.getZ(), arrowBack.left.getZ()];			
			
			var arrowX = [arrow.left.getX(), arrow.top.getX(), arrow.right.getX(), arrow.bottom.getX(), arrow.left.getX()];
			var arrowY = [arrow.left.getZ(), arrow.top.getZ(), arrow.right.getZ(), arrow.bottom.getZ(), arrow.left.getZ()];
			
			var img = new BufferedImage(32, 32, BufferedImage.TYPE_INT_ARGB);	
			var g = img.getGraphics();
			g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
			g.setColor(windowColors.clear);
			g.fillRect(0,0,32,32);
			
			g.setColor(new Color(0, 0, 0, .75));
			g.fillPolygon(arrowBackX, arrowBackY,5);
			
			g.setColor(new Color(1, 0, 0, 1));
			g.fillPolygon(arrowX, arrowY,5);
			g.setColor(windowColors.clear);
			this.arrowImage = img;
			img = null;
		
		}
		
		var radians =  ang/180 * Math.PI;
				
		var img2 = new BufferedImage(32, 32, BufferedImage.TYPE_INT_ARGB);	
		var g2 = img2.getGraphics();

		// in reversed order (so check them backwards)
		// 4. translate it to the center of the component
		// 3. do the actual rotation
		// 2. just a scale because this image is big
		// 1. translate the object so that you rotate it around the center (easier) 
		// draw the image
		
		var at = new java.awt.geom.AffineTransform();
		at.translate(this.arrowImage.getWidth()/2, this.arrowImage.getHeight()/2);
		at.rotate(radians);
		at.scale(0.5, 0.5);
		at.translate(-this.arrowImage.getWidth()/2, -this.arrowImage.getHeight()/2);
		var g2d = Graphics2D(g2);
		g2d.drawImage(this.arrowImage, at, null);
		g2d.dispose();
		
		this.compList['mapArrow'].setIcon(new ImageIcon(img2));
		img2 = null;
		
	};
	
	MapFrame.prototype.updateCursor = function updateCursor(x, y) {
		var img = new BufferedImage(this.viewSize.width,this.viewSize.height, BufferedImage.TYPE_INT_ARGB);
		var cursorSize = 24;
		var g = img.getGraphics();
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		g.setColor(windowColors.lightWeak);
		//draw3DRect(int x, int y, int width, int height, boolean raised)
		g.fillOval(x-cursorSize/2, y-cursorSize/2, cursorSize,cursorSize)
		this.compList['mapOverlay'].setIcon(new ImageIcon(img));
		img = null;			
		g.dispose();
	};	

	MapFrame.prototype.updateWaypoints = function updateWaypoints() {
	
		//this.waypoints.push({name:name, vec:vec, color:color, group:group});
		//printDebug("this.waypoints", this.waypoints);
		
		var img = new BufferedImage(this.viewSize.width,this.viewSize.height, BufferedImage.TYPE_INT_ARGB);
		var iconSize = 10;
		var g = img.getGraphics();
		g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
		
		var baseVec = Vector(Math.round(this.imageCenterVec.getX()-this.viewSize.width/2), 1, Math.round(this.imageCenterVec.getZ()-this.viewSize.height/2));
	
		for (var inc = 0; inc < this.waypoints.length; inc++) {
			
			var mapX = Math.min(Math.max((this.waypoints[inc].vec.getX() - baseVec.getX())-iconSize/2,0), 
				(this.viewSize.width-iconSize));
			var mapY = Math.min(Math.max((this.waypoints[inc].vec.getZ() - baseVec.getZ())-iconSize/2,0), 
				(this.viewSize.height-iconSize));
				
			var iconColor = this.waypoints[inc].color;
			
			if (mapX == 0 || mapY == 0 || mapX+iconSize == this.viewSize.width || mapY+iconSize == this.viewSize.height) {
				iconColor = new Color(iconColor.getRed()/255, iconColor.getGreen()/255, iconColor.getBlue()/255, iconColor.getAlpha()/255*.45);
			}
			
			
			g.setColor(iconColor.brighter());
			g.fillOval(mapX, mapY, iconSize,iconSize);
			g.setColor(iconColor.darker().darker());
			g.drawOval(mapX, mapY, iconSize,iconSize);
			//g.draw3DRect(mapX, mapY, iconSize,iconSize, true);
			
		
		}
		this.compList['mapWaypoints'].setIcon(new ImageIcon(img));
		img = null;			
		g.dispose();
		//printDebug("this.waypoints2", this.waypoints);
	
	}	
	
	MapFrame.prototype.mapZoom = function mapZoom() {
	
		return;
		var xScaleFactor = 2;
		var yScaleFactor = 2;
		var img = new BufferedImage(this.viewSize.width, this.viewSize.height, BufferedImage.TYPE_INT_RGB);
		img.setData(this.imageObj.getRaster());
		//var originalImage = img; //
		var g = this.imageObj.getGraphics();
		var g2 = java.awt.Graphics2D(g);
		var newW = parseInt(img.getWidth() * xScaleFactor);
		var newH = parseInt(img.getHeight() * yScaleFactor);
          g2.setRenderingHint(RenderingHints.KEY_INTERPOLATION,
                    //RenderingHints.VALUE_INTERPOLATION_BILINEAR);
                    RenderingHints.VALUE_INTERPOLATION_NEAREST_NEIGHBOR);
                    //RenderingHints.VALUE_INTERPOLATION_BICUBIC);
          g2.drawImage(img, -this.viewSize.width/2, -this.viewSize.height/2, newW, newH, null);
		img = null;
		//this.frame.repaint();

	}
	
	MapFrame.prototype.mapRefresh = function mapRefresh() {
	
		if (this.imageObj == null) return;

		if (player.getBlockIn().equals(this.imageCenterVec))  {
			this.updateArrow();
		}
		else {
			delayAction(function (p) { p.buildGameMap.call(p); p=null; }, this.obj, 0);
			this.updateArrow();
			this.updateCoords();
			this.updateWaypoints();
		}
	};
	
	MapFrame.prototype.mapMouseMove = function mapMouseMove(evt) {
		this.updateCoords(evt.getX(), evt.getY());
		this.updateCursor(evt.getX(), evt.getY());
		//this.updateMapArea(topVec, 32);
		this.refreshMapArea((new Vector(evt.getX(), 1, evt.getY())), 32);	
	};
	
	MapFrame.prototype.mapMouseClick = function mapMouseClick(evt) {

		var gameVec = Vector(Math.floor(this.imageCenterVec.getX()-this.viewSize.width/2+evt.getX()), 1, Math.floor(this.imageCenterVec.getZ()-this.viewSize.height/2+evt.getY()));
		gameVec = gameVec.multiply(this.mapScale, 1, this.mapScale);
		
		var yMax = session.getHighestTerrainBlock(gameVec.getX(),gameVec.getZ(), 0, 256, false);
		var topVec = Vector(gameVec.getX(), yMax, gameVec.getZ());		
		
		
		
		if (evt.getButton() == 1) {			//Left Click
			
			CreateLargeTree(topVec, session, 20, new BaseBlock(17), new BaseBlock(18));
		}
		else {
			//if (evt.getModifiersEx() & java.event.mouseEvent.ALT_DOWN_MASK == java.event.mouseEvent.ALT_DOWN_MASK) {
			if (evt.isAltDown()) {
				player.print("\n \n \n \n It worked mofo!!!!\n \n \n ");
			}
			else {
				do {
					for (var i in windowColors) if (Math.random() > .99) var rClr = windowColors[i];	// odd way of getting a random color
				} while (typeof rClr == 'undefined');
				this.addWaypoint("test", topVec, rClr, "test");
				//this.buildGameMap();
			}	
			return;
		}
		this.updateMapArea(topVec, 20);
		this.refreshMapArea((new Vector(evt.getX(), 1, evt.getY())), 20);
	
	};
	
	MapFrame.prototype.mapMouseDrag = function mapMouseDrag(evt) {
		try {

			this.updateCursor(evt.getX(), evt.getY());
			this.updateCoords(evt.getX(), evt.getY());
			
			var gameVec = Vector(this.imageCenterVec.getX()-this.viewSize.width/2+evt.getX(), 1, this.imageCenterVec.getZ()-this.viewSize.height/2+evt.getY());
			var yMax = session.getHighestTerrainBlock(gameVec.getX(),gameVec.getZ(), 0, 256, false);
			var topVec = Vector(gameVec.getX(), yMax, gameVec.getZ());
			
			if (evt.getModifiers() == 16) {
				CreateSphere(4,0,topVec,  new BaseBlock(41))
			}
			else {
				//BuildFlat(topVec);
				try {
					BuildErode(topVec);
				}
				catch(e) {}
			}
			
			this.updateMapArea(topVec, 16);
			this.refreshMapArea((new Vector(evt.getX(), 1, evt.getY())), 16);
		}
		catch(e) {
			player.print("Mouse Error: " + e);
		}
	};

	MapFrame.prototype.addWaypoint = function addWaypoint(name, vec, color, group) {
	
		this.waypoints.push({name:name, vec:vec, color:color, group:group});
		this.updateWaypoints();
	
	}
	
}

var InputFrame = function InputFrame() {}; {
	InputFrame.prototype = new BaseFrame();
	InputFrame.prototype.globalId = '$input';
	InputFrame.prototype.loader = InputFrame;	
	InputFrame.prototype.title = "Input";
	InputFrame.prototype.color = windowColors.darkStrong;	
	InputFrame.prototype.bounds = {x:512, y:256, width:350, height:200};
	InputFrame.prototype.buttonHeight = 24;
	InputFrame.prototype.inputHeight = 24;
	InputFrame.prototype.messageText = "Please input a value below. This is a really long question, what is your answer? Tell me!!!\n \n ";
	InputFrame.prototype.buttonText = ["Cancel", "Enter"];
	InputFrame.prototype.callBackObject = null;
	InputFrame.prototype.callBack = null;	
	InputFrame.prototype.messageSize = {};
	
	InputFrame.prototype.buildMain = function buildMain() {
		
		var pointer = this.obj;
		
		var labelMessage = new JLabel("Message", JLabel.CENTER);
		labelMessage.setFont(new Font("Trebuchet MS", Font.BOLD, 15));
		labelMessage.setForeground(windowColors.white);
		
		//labelMessage.setCursor(new java.awt.Cursor(java.awt.Cursor.HAND_CURSOR));
		labelMessage.setVerticalAlignment(SwingConstants.TOP)
		
		var textCommandInput = new JTextPane();
		textCommandInput.setFont(new Font("Tahoma", Font.BOLD, 14));
		textCommandInput.setEditable(true);
		textCommandInput.setBorder(null);
		var caret = textCommandInput.getCaret().setUpdatePolicy(javax.swing.text.DefaultCaret.UPDATE_WHEN_ON_EDT );

		//var doc = textCommandInput.getStyledDocument();
		//var style = textCommandInput.addStyle("tmpStyle", null);
		//javax.swing.text.StyleConstants.setForeground(style, Color.red);
		//try { doc.insertString(doc.getLength(), "23RED ",style); } catch (e){}
		//javax.swing.text.StyleConstants.setForeground(style, Color.blue);
		//try { doc.insertString(doc.getLength(), "BLUE", style); } catch (e){}		

		var popMenu = new JPopupMenu();
		popMenu.setBackground(Color.white);
		var popItem  = new JMenuItem("Click Me!");
		popItem.setIcon(null);
		popMenu.add(popItem);
		popMenu.setLayout(null);		
		popMenu.add("For OK Times");
		popMenu.add("For Shitty Times");

		textCommandInput.setComponentPopupMenu(popMenu);
		
		var toolTip = JToolTip();
		textCommandInput.setToolTipText(this.buttonText[1]);
		//javax.swing.ToolTipManager.setInitialDelay(0);
		
		var menu = new JPopupMenu();
		menu.add("...whatever...");
		
		var btnCancel = new JButton();
		btnCancel.setFont(new Font("Tahoma", Font.PLAIN, 13));		
		btnCancel.setText(this.buttonText[0]);
		btnCancel.setForeground(windowColors.darkStrong);
		
		var btnEnter = new JButton();
		btnEnter.setFont(new Font("Tahoma", Font.PLAIN, 13));		
		btnEnter.setText(this.buttonText[1]);
		btnEnter.setForeground(windowColors.darkStrong);
		
		textCommandInput.addKeyListener(new java.awt.event.KeyListener{			// command text input key listener
			keyPressed: function(evt) {
				
				//pointer.printRight.call(pointer, "pressed = " + evt);
				//if (evt.getKeyCode() == 10) pointer.printRight.call(pointer, "\n\nYou hit enter \n\n");
			},
			keyReleased: function(evt) {

				if (evt.getKeyCode() == 10) { 		//Enter key
					var tmpStr = textCommandInput.getText();
					printDebug("tmpStr", tmpStr);
					//if (typeof tmpStr == 'undefined' || tmpStr == "") return;
					
					pointer.sendInput(pointer.compList['inputTextInput'].getText());
					pointer.setMessage();
					pointer.compList['inputTextInput'].setText("");
				}
				
			},
			keyTyped: function(evt) {
				//pointer.printRight.call(pointer, "typed = " + evt);
					
			}
		});	
		
		btnCancel.addActionListener(new java.awt.event.ActionListener() {
			actionPerformed: function (evt) {
				menu.show(btnCancel ,btnCancel.getBounds().x, btnCancel.getBounds().height);
			}
		});			
		
		btnEnter.addActionListener(new java.awt.event.ActionListener() {
			actionPerformed: function (evt) {
				try {
					var g = btnCancel.getGraphics();
					g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
					pointer.setMessage(pointer.compList['inputTextInput'].getText());
					pointer.buildGameText(pointer.messageText);
					
					g.setColor(Color.black);
					g.fillOval(0,0,32,32);
					g.dispose();

				}
				catch (e) {
					printError("btnEnter Action", e);
				}
			}
		});		
		

		//textCommandInput.setToolTipText("Enter a game command, or a js command with @");
		//javax.swing.ToolTipManager.setInitialDelay(0);
		
		var scrollPaneInput = new JScrollPane(textCommandInput, ScrollPaneConstants.VERTICAL_SCROLLBAR_NEVER, ScrollPaneConstants.HORIZONTAL_SCROLLBAR_NEVER);
		scrollPaneInput.add(textCommandInput);
		scrollPaneInput.getViewport().add(textCommandInput);			
		scrollPaneInput.getViewport().setOpaque(true);
		scrollPaneInput.getViewport().setBackground(windowColors.white);
		scrollPaneInput.setOpaque(true);
		scrollPaneInput.setBackground(windowColors.white);
		scrollPaneInput.setBorder(null);
		scrollPaneInput.setBorder(BorderFactory.createCompoundBorder((BorderFactory.createLineBorder(windowColors.white, 2)), BorderFactory.createEmptyBorder(3, 0, 0, 0)));
		
		this.addComp('inputMessage', labelMessage);
		this.addComp('inputTextScroll', scrollPaneInput);
		this.addComp('inputTextInput', textCommandInput, true);
		this.addComp('inputButtonCancel', btnCancel);		
		this.addComp('inputButtonEnter', btnEnter);
		this.compList['inputTextInput'].requestFocus();
		
		this.setMessage(this.messageText);
		this.frame.repaint();
	};
	
	InputFrame.prototype.resizeMain = function resizeMain() {

		var btnWidth = this.bounds.width * .35;
		var btnPos = { cancel: this.bounds.width * .25 - btnWidth/2, enter: this.bounds.width * .75 - btnWidth/2 };
		
		this.compList['inputTextScroll'].setBounds(this.frameBorder*4, this.bounds.height-this.frameBorder*8-this.inputHeight-this.buttonHeight,this.bounds.width - this.frameBorder*8, this.inputHeight);
		this.compList['inputButtonCancel'].setBounds(btnPos.cancel, this.bounds.height-this.frameBorder*4-this.buttonHeight, btnWidth, this.buttonHeight);
		this.compList['inputButtonEnter'].setBounds(btnPos.enter, this.bounds.height-this.frameBorder*4-this.buttonHeight, btnWidth, this.buttonHeight);
		this.compList['inputMessage'].setBounds(this.frameBorder*4,this.topBarHeight+this.frameBorder*3,this.bounds.width-this.frameBorder*8, this.bounds.height-(this.frameBorder*14+this.inputHeight+this.buttonHeight+this.topBarHeight));
		this.setMessage(this.messageText);
	};
	
	InputFrame.prototype.setMessage = function setMessage(msg) {
		if (typeof msg == 'undefined') return;
		this.messageText = msg;
		var msgWidth = (this.bounds.width - (this.frameBorder * 8))*.78;
		
		var html1 = "<html><body style='width: ";
		var html2 = "px'>";
		
		var htmlText = html1 + String(msgWidth) + html2 + msg;
			
		//this.fadeColor(this.compList['inputMessage'], this.compList['inputMessage'].setForeground, windowColors.clear, windowColors.white, 3000);
		this.compList['inputMessage'].setText(htmlText);
		
		//var comStr = String(this.compList['debugCommandInput'].getText()).replace('\r', "").replace('\n', "");		
	
	};
	
	InputFrame.prototype.setCallback = function setCallback(callBack) {
		this.callBack = callBack;
	
	};
	
	InputFrame.prototype.sendInput = function sendInput(msg) {
		this.callback(msg)
	};

}

var TextBuilderFrame = function TextBuilderFrame() {}; {
	TextBuilderFrame.prototype = new InputFrame();
	TextBuilderFrame.prototype.globalId = '$textBuilder';
	TextBuilderFrame.prototype.loader = TextBuilderFrame;	
	TextBuilderFrame.prototype.title = "Text Builder";
	TextBuilderFrame.prototype.messageText = "Please input a value below. This is a really long question, what is your answer? Tell me!! Seriously, I need a really long test for this to work right, so I just need to keep on typing and not even think about what in the world I need to put down because it really doesn't matter like i said in the past you have to really live fast or you will die young. fine Done!\r\n\r\n Please input a value below. This is a really long question, what is your answer? Tell me!! Seriously, I need a really long test for this to work right, so I just need to keep on typing and not even think about what in the world I need to put down because it really doesn't matter like i said in the past you have to really live fast or you will die young. fine Done!\n\n";
	TextBuilderFrame.prototype.buttonText = ["Cancel", "Enter"];
	
	this.fontBarHeight = 100;	
	
	TextBuilderFrame.prototype.sendInput = function sendInput(msg) {
		this.setMessage(msg);
		this.buildGameText(msg);
		
		//this.callback(msg);
	};
		
	TextBuilderFrame.prototype.buildGameText = function buildGameText(msg) {
		try {
		
			var fontSize = 75;
			var blackWool = new BaseBlock(35, 15);  //black wool
			var edgeWool = new BaseBlock(159, 4); 	//hardened clay

			var blackWool = new BaseBlock(2, 0);  //black wool
			var edgeWool = new BaseBlock(1, 0); 	//hardened clay

			var edgeOffset = 1;
			var air = new BaseBlock(0);
			var thickness = 5;

			/*	// Test URL Font 
			var fontUrl = new URL("http://www.webpagepublicity.com/free-fonts/a/Airacobra%20Condensed.ttf");
			var font = Font.createFont(Font.TRUETYPE_FONT, fontUrl.openStream());
			var ge = GraphicsEnvironment.getLocalGraphicsEnvironment()
			var fonts = new JList( ge.getAvailableFontFamilyNames() );
			var obj = JOptionPane.showMessageDialog(null, new JScrollPane(fonts));	
			printDebug("obj", obj.getInputValue());
			*/
			
			var urlFontList = [
				//new URL("http://www.webpagepublicity.com/free-fonts/a/Airacobra%20Condensed.ttf"),
				//new URL("http://www.webpagepublicity.com/free-fonts/a/Aramis%20Regular.ttf"),
				new URL("http://www.webpagepublicity.com/free-fonts/c/Candice.ttf"),
				//new URL("http://www.webpagepublicity.com/free-fonts/h/Halter%20Antigenic.ttf"),
				//new URL(""),
				//new URL(""),
				//new URL(""),
				//new URL(""),
				//new URL(""),
			]
			var font = Font.createFont(Font.TRUETYPE_FONT, urlFontList[0].openStream());
			font = font.deriveFont(Font.PLAIN, fontSize);
			GraphicsEnvironment.getLocalGraphicsEnvironment().registerFont(font);
			
			/*		Display Message Using the font
			var ll = new JLabel("The quick brown fox jumped over the lazy dog. 0123456789");
			ll.setFont(font);
			//JOptionPane.showMessageDialog(null, ll);		
			*/
	
			this.compList['inputMessage'].setFont(font);
			var g = this.frame.getGraphics();
			var metrics = g.getFontMetrics(font);
			
			var height = metrics.getStringBounds(msg, g).height*2;	
			var width = metrics.getStringBounds(msg, g).width+2;
			g.dispose();
				
			var img = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);		
			var g = img.getGraphics();
			g.setFont(font);
			g.setColor(Color.white);
			g.fillRect(0,0,width, height);
			g.setColor(Color.black);
			g.drawString(msg, 1, height*.7);
			g.dispose();
			
			var sides = [new Vector(1,0,0), new Vector(-1,0,0), new Vector(0,1,0), new Vector(0,-1,0)];
			var base = getTarget().vec.add(0,0,0);
			base = base.add(-(width/2), 5, 0);
			
			var edge = false;
			for (var x = 0; x < width; x++) {
				for (var y = height-1; y >= 0; y--) {
					var clr = new Color(img.getRGB(x, (height-1)-y));
					if(clr.getRed()< 250 && clr.getGreen() < 250 && clr.getBlue() < 250) {
						for (var z = Math.max(0 - edgeOffset); z < thickness + edgeOffset; z++) setBlock(base.add(x, y, z), edgeWool);
					}
					else {
						var edge = false;
						for (var i in sides) {
							try {
								var tmpColor = new Color(img.getRGB(x+sides[i].x, height-1-y+sides[i].y));
								if (tmpColor.getRed()< 250 && tmpColor.getGreen() < 250 && tmpColor.getBlue() < 250) {
									edge = true;
									for (var z = 0; z < thickness; z++) setBlock(base.add(x, y, z), blackWool);
								}
							}
							catch(e) {
								//this just seemed easier...
							}		
						}	
						if (edge == false) {
							for (var z = 0; z < thickness; z++) setBlock(base.add(x, y, z), airMat);
						
						}
					}
				}
			}
			//player.print(text.Gold + "Text Created!");
		}
		catch(e) {
			printError("Text Gen", e);
		}
	};
	
}


var MCFrame = function MCFrame() {}; {
	MCFrame.prototype = new BaseFrame();
	MCFrame.prototype.globalId = '$mcFrame';
	MCFrame.prototype.loader = MCFrame;	
	MCFrame.prototype.title = "Minecraft JS Test";
	MCFrame.prototype.color = windowColors.darkStrong;	
	MCFrame.prototype.bounds = {x:512, y:256, width:650, height:450};
	
	MCFrame.prototype.f = 0;
	MCFrame.prototype.pixels;
	MCFrame.prototype.w = 200;
	MCFrame.prototype.h = 200;
	MCFrame.prototype.map = new Array(64 * 64 * 64);
	MCFrame.prototype.textmap = new Array(16 * 16 * 3 * 16);	

	MCFrame.prototype.buildMain = function buildMain() {

		var imgLabel = new JLabel();
		imgLabel.setCursor(new java.awt.Cursor(java.awt.Cursor.CROSSHAIR_CURSOR ));;
		imgLabel.setHorizontalAlignment (JLabel.CENTER);
		this.addComp('mcImage', imgLabel);		
		
		for ( var i = 1; i < 16; i++) {
			var br = 255 - ((Math.random() * 96) | 0);
			for ( var y = 0; y < 16 * 3; y++) {
				for ( var x = 0; x < 16; x++) {
					var color = 0x966C4A;
					if (i == 4)
						color = 0x7F7F7F;
					if (i != 4 || ((Math.random() * 3) | 0) === 0) {
						br = 255 - ((Math.random() * 96) | 0);
					}
					if ((i == 1 && y < (((x * x * 3 + x * 81) >> 2) & 3) + 18)) {
						color = 0x6AAA40;
					} else if ((i == 1 && y < (((x * x * 3 + x * 81) >> 2) & 3) + 19)) {
						br = br * 2 / 3;
					}
					if (i == 7) {
						color = 0x675231;
						if (x > 0 && x < 15
								&& ((y > 0 && y < 15) || (y > 32 && y < 47))) {
							color = 0xBC9862;
							var xd = (x - 7);
							var yd = ((y & 15) - 7);
							if (xd < 0)
								xd = 1 - xd;
							if (yd < 0)
								yd = 1 - yd;
							if (yd > xd)
								xd = yd;

							br = 196 - ((Math.random() * 32) | 0) + xd % 3 * 32;
						} else if (((Math.random() * 2) | 0) === 0) {
							br = br * (150 - (x & 1) * 100) / 100;
						}
					}

					if (i == 5) {
						color = 0xB53A15;
						if ((x + (y >> 2) * 4) % 8 === 0 || y % 4 === 0) {
							color = 0xBCAFA5;
						}
					}
					if (i == 9) {
						color = 0x4040ff;
					}
					var brr = br;
					if (y >= 32)
						brr /= 2;

					if (i == 8) {
						color = 0x50D937;
						if (((Math.random() * 2) | 0) === 0) {
							color = 0;
							brr = 255;
						}
					}

					var col = (((color >> 16) & 0xff) * brr / 255) << 16
							| (((color >> 8) & 0xff) * brr / 255) << 8
							| (((color) & 0xff) * brr / 255);
						//player.print("col" + col);
					this.textmap[x + y * 16 + i * 256 * 3] = col;
				}
			}
		}
		
		//ctx = document.getElementById('game').getContext('2d');

		for (x = 0; x < 64; x++) {
			for (y = 0; y < 64; y++) {
				for ( var z = 0; z < 64; z++) {
					i = z << 12 | y << 6 | x;
					yd = (y - 32.5) * 0.4;
					var zd = (z - 32.5) * 0.4;
					this.map[i] = (Math.random() * 16) | 0;
					if (Math.random() > Math.sqrt(Math.sqrt(yd * yd + zd * zd)) - 0.8)
						this.map[i] = 0;
				}
			}
		}
		var arSize = parseInt(this.h*this.w*4);
		this.pixels = new Array(arSize);
		
		
		for (i = 0; i < this.w * this.h; i++)  {
			//pixels.data[i * 4 + 3] = new;
			this.pixels[i * 4 + 3] = 255;
		}
		var p = this.obj;
		
		//delayAction(function (p) { p.buildGameMap.call(p); p=null; }, 0, this.obj);
		
		delayAction(function(){
			p.clock(); 
		},null, 1);
		
		player.print("I am past the delay!");
	};

	MCFrame.prototype.resizeMain = function resizeMain() {
		this.compList['mcImage'].setBounds(this.frameBorder,this.topBarHeight+this.frameBorder,this.bounds.width-this.frameBorder*2, this.bounds.height-(this.topBarHeight+this.frameBorder*2));
	}
	
	
	MCFrame.prototype.clock = function clock() {
		try {
			
			this.renderMinecraft();
			
			var img = new BufferedImage(this.w, this.h, BufferedImage.TYPE_INT_RGB);
			
			for (var x = 0; x < this.w; x++) {
				for( var y = 0; y < this.h; y++) {
					img.setRGB(x,y, this.pixels[x*y+3]);
				}
			}			
			
			
			//ctx.putImageData(pixels, 0, 0);
			var g = img.getGraphics();
			g.drawImage(img, 0, 0, null);
			this.compList['mcImage'].setIcon(ImageIcon(img));
			g.dispose();

		}
		catch (e) {
			printError("MCFrame Clock", e);
		}
	};
	
	
	MCFrame.prototype.renderMinecraft = function renderMinecraft() {
		var xRot = Math.sin(Date.now() % 10000 / 10000 * Math.PI * 2) * 0.4 + Math.PI / 2;
		var yRot = Math.cos(Date.now() % 10000 / 10000 * Math.PI * 2) * 0.4;
		var yCos = Math.cos(yRot);
		var ySin = Math.sin(yRot);
		var xCos = Math.cos(xRot);
		var xSin = Math.sin(xRot);

		var ox = 32.5 + Date.now() % 10000 / 10000 * 64;
		var oy = 32.5;
		var oz = 32.5;

		this.f++;
		for ( var x = 0; x < this.w; x++) {
			var ___xd = (x - this.w / 2) / this.h;
			for ( var y = 0; y < this.h; y++) {
				var __yd = (y - this.h / 2) / this.h;
				var __zd = 1;

				var ___zd = __zd * yCos + __yd * ySin;
				var _yd = __yd * yCos - __zd * ySin;

				var _xd = ___xd * xCos + ___zd * xSin;
				var _zd = ___zd * xCos - ___xd * xSin;

				var col = 0;
				var br = 255;
				var ddist = 0;

				var closest = 32;
				for ( var d = 0; d < 3; d++) {
					var dimLength = _xd;
					if (d == 1)
						dimLength = _yd;
					if (d == 2)
						dimLength = _zd;

					var ll = 1 / (dimLength < 0 ? -dimLength : dimLength);
					var xd = (_xd) * ll;
					var yd = (_yd) * ll;
					var zd = (_zd) * ll;

					var initial = ox - (ox | 0);
					if (d == 1)
						initial = oy - (oy | 0);
					if (d == 2)
						initial = oz - (oz | 0);
					if (dimLength > 0)
						initial = 1 - initial;

					var dist = ll * initial;

					var xp = ox + xd * initial;
					var yp = oy + yd * initial;
					var zp = oz + zd * initial;

					if (dimLength < 0) {
						if (d === 0)
							xp--;
						if (d === 1)
							yp--;
						if (d === 2)
							zp--;
					}

					while (dist < closest) {
						var tex = this.map[(zp & 63) << 12 | (yp & 63) << 6 | (xp & 63)];

						if (tex > 0) {
							var u = ((xp + zp) * 16) & 15;
							var v = ((yp * 16) & 15) + 16;
							if (d == 1) {
								u = (xp * 16) & 15;
								v = ((zp * 16) & 15);
								if (yd < 0)
									v += 32;
							}

							var cc = this.textmap[u + v * 16 + tex * 256 * 3];
							if (cc > 0) {
								col = cc;
								ddist = 255 - ((dist / 32 * 255) | 0);
								br = 255 * (255 - ((d + 2) % 3) * 50) / 255;
								closest = dist;
							}
						}
						xp += xd;
						yp += yd;
						zp += zd;
						dist += ll;
					}
				}

				var r = ((col >> 16) & 0xff) * br * ddist / (255 * 255);
				var g = ((col >> 8) & 0xff) * br * ddist / (255 * 255);
				var b = ((col) & 0xff) * br * ddist / (255 * 255);// + (255 -

				this.pixels[(x + y * this.w) * 4 + 0] = r;
				this.pixels[(x + y * this.w) * 4 + 1] = g;
				this.pixels[(x + y * this.w) * 4 + 2] = b;
			}
		}
	};
}



///////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////
 
if (argv[1] == "#") {
	removeGlobal("$debug");
	removeGlobal("$map");	
	removeGlobal("$input");
	
	print("### Global Reload ###");
	argv[1] = "win";
	//argv[2] = "#";
}

if ($spc != false) {		//clean up with the frame holder class

	$debug = loadGlobal("$debug");
	$debug = $debug ? $debug: new DebugFrame();
	saveGlobal("$debug", $debug);

	$map = loadGlobal("$map");
	$map = $map ? $map: new MapFrame();
	saveGlobal("$map", $map);

	$textBuilder = loadGlobal("$textBuilder");
	$textBuilder = $textBuilder ? $textBuilder: new TextBuilderFrame();
	saveGlobal("$textBuilder", $textBuilder);
}


main();

function main() {

	mode = parseMode((argv.length > 1 ? argv[1] : 2));		//test and return a good mode value
	
	if (loadGlobal("$repeat")) removeGlobal("$repeat");
		
	brushTool.setSize(gSize);
	brushTool.setFill(gMat);
	
	saveConfigKey('lastUpdate', new Date().getTime());
	
	brush = new Brush( {		//Setup the brush - This is what runs each time it's clicked
		build : function(editSession,posAlt,mat,size) {
			
			try {
				
				org.mozilla.javascript.Context.getCurrentContext().getFactory().enterContext();	
				if (loadGlobal("$repeat") != false) {
					if ( posAlt == zVec) {
						$repeat = loadGlobal("$repeat");
					}
					else {
						removeGlobal("$repeat")
						$repeat = false;
						return;
					}
				}
				else if (checkFlag("*") != false && posAlt != zVec) {
					$repeat = (typeof checkFlag("*") == 'boolean') ? 50 : checkFlag("*");
					saveGlobal("$repeat", $repeat);
				}
				
				//if (org.lwjgl.input.Keyboard.isKeyDown(42) == true) print(org.lwjgl.input.Keyboard.isKeyDown(42)); //left-shift
			
				session = editSession;
				var pos = getTarget().vec;
				
				if (typeof pos != 'undefined') {
					vecList.unshift(pos);
					//debug("Click Location: ", pos);
					
					var blackList = [6,31,32,37,38,39,30,78];	//Move the position down one if a natural block is clicked (grass, flowers, etc)
					if (parseInt(blackList.indexOf(getBlock(pos).getType())) != -1) {
						pos = pos.add(0,-1,0);
					}
					
					gMat = ((mat.next(0,0,0).getType() == 0) && (mat.next(0,0,0).getData() == 1)) ? gMat : mat;		//set gMat if brush mat has changed
					gSize = size != -1 ? size : -1; 
					
					movePlayer = getBlock(player.getBlockIn().add(0,1,0)).getType() == 0 ? true : false;
					
					if (checkFlag("^")) tools[mode].mySub(pos);		//run the function for the specified mode
					else BuildTimerTool(tools[mode].mySub, pos);
					
					if(getBlock(player.getBlockIn().add(0,1,0)).getType() != 0 && movePlayer == true) {		//if player has been covered, find free spot
						player.findFreePosition();
					}
				}
				
				if ($repeat != false) {
					delayAction( function() {
						brush.build(editSession,zVec,mat,size);
					}, null, $repeat);
				}
			}
			catch (e) {
				player.print(text.Red + "Error! " + text.White + String(e));
			}
		},
	});

	if (argv.length < 2)  {
		HelpText(0);
	} 
	else {
		InitializeBrush();
	}

}


//////////////////////////////////////////////////////////
//				Internal Utility Functions
//////////////////////////////////////////////////////////


function LoadStaticObjects() {

	windowColors = {
		'black': new Color(0.0, 0.0, 0.0, 1.0),
		'white': new Color(1.0, 1.0, 1.0, 1.0),
		'red': new Color(1.0, 0.0, 0.0, .75),
		'green':  new Color(0.12, 0.8, 0.0, .75),
		'blue': new Color(0.0, 0.61, 1.0, .75),
		'gold':  new Color(1.0, 0.61, 0.0, .75),
		'lightWeak':  new Color(1.0, 1.0, 1.0, .12),
		'lightMedium':  new Color(1.0, 1.0, 1.0, .50),
		'lightStrong':  new Color(1.0, 1.0, 1.0, .75),
		'darkWeak':  new Color(0.0, 0.0, 0.0, .25),
		'darkMedium':  new Color(0.0, 0.0, 0.0, .50),
		'darkStrong':  new Color(0.0, 0.0, 0.0, .75),		
		'clear': new Color(0.0, 0.0, 0.0, 0.01)
	};

	blockColors = {
		0: [0,0,0],			//Air
		1: [180,180,180],		//stone
		2: [0,225,0],			//grass
		3: [168,117,68],		//dirt
		4: [125,125,125],		//cobblestone
		5: [185,133,83],		//wood planks
		6: [0,210,0],			//saplings
		7: [60,60,60],		//bedrock
		8: [0,0,255],			//water (flowing]
		9: [0,0,235],			//water (stationary]
		10: [255,155,102],	//lava (flowing]
		11: [255,129,61],		//lava (stationary]	
		12: [228,216,174],	//sand
		13: [190,190,210],	//gravel
		14: [245,232,73],		//gold ore
		15: [211,179,160],	//iron ore
		16: [61,61,61],		//coal ore
		17: [165,103,53],		//wood
		18: [76,150,24],		//leaves
		20: [158,255,243],	//glass
		24: [226,206,140],	//sandstone
		31: [0,210,0],		//long grass
		32: [224,162,64],		//shrub
		37: [255,248,56],		//yellow flower
		38: [225,0,0],		//red rose
		41: [255, 215, 0], 	//gold block
		42: [135,135,135],	//iron block
		44: [165,165,165],	//step
		50: [255,248,56],		//torch
		53: [185,133,83],		//wood stairs
		59: [205,222,61],		//wheat crops
		65: [185,133,83],		//ladder
		67: [125,125,125],	//cobblestone stairs
		78: [230,255,255],	//snow layer
		79: [180,255,236],	//ice
		81: [76,150, 24],		//cactus
		82: [150,150,180],	//clay
		83: [89,255, 89],		//reed
		85: [185,133,83],		//wood fence
		102: [158,255,243],	//glass pane
		106: [0,150,0],		//vines
		110: [100,90,100],	//mycelium
		111: [96,188,30],		//lily pad
		128: [226,206,140],	//sandstone stairs
		134: [185,133,83],	//spruce wood stairs
		141: [205,222,61],	//carrot crops
		142: [205,222,61],	//potato crops
		
		'35:0':  [254, 254, 254], // White - Wools colors borrowed from Sk89q's draw script
		'35:1': [255, 100, 0], // Orange
		'35:2': [200, 0, 200], // Magenta
		'35:3': [87, 132, 223], // Light blue
		'35:4': [255, 255, 0], // Yellow
		'35:5': [0, 255, 0], // Green
		'35:6': [255, 180, 200], // Pink
		'35:7': [72, 72, 72], // Gray
		'35:8': [173, 173, 173], // Light grey
		'35:9': [0, 100, 160], // Cyan
		'35:10': [120, 0, 200], // Purple
		'35:11': [0, 0, 175], // Blue
		'35:12': [100, 60, 0], // Brown
		'35:13': [48, 160, 0], // Cactus green
		'35:14': [255, 0, 0], // Red
		'35:15': [0, 0, 0], // Black		
	}

	oreList = {
		'0':  {BlockID:  16,			//Coal Ore
			chance:   100,			//Weighted probability, coal ore is considered baseline at 100, use 0 to stop an item from spawning completely
			minSize:   8,			//minimum possible vein size`t
			maxSize:	16,			//maximum possible vein size
			minY:	0,				//Lowest possible spawning y height
			maxY:	256				//Highest possible spawning y height
		},
		'1':  {BlockID:  15,			//Iron Ore
			chance:   60,
			minSize:   6,
			maxSize:	12,
			minY:	16,
			maxY:	256	
		},
		'2':  {BlockID:  14,			//Gold Ore
			chance:   18,
			minSize:   6,
			maxSize:	10,
			minY:	4,
			maxY:	32
		},
		'3':  {BlockID:  56,			//Diamond Ore
			chance:   16,
			minSize:   4,
			maxSize:	8,
			minY:	0,
			maxY:	16	
		},
		'4':  {BlockID:  21,			//Lapis Lazuli Ore
			chance:   14,
			minSize:   4,
			maxSize:	10,
			minY:	0,
			maxY:	32
		},
		'5':  {BlockID:  73,			//Redstone Ore
			chance:   75,
			minSize:   6,
			maxSize:	10,
			minY:	0,
			maxY:	15
		},
		'6':  {BlockID:  129,			//Emerald Ore
			chance:   .25,
			minSize:   2,
			maxSize:	45,
			minY:	0,
			maxY:	125
		},
		'7':  {BlockID:  12,			//Sand
			chance:   0,
			minSize:   6,
			maxSize:	20,
			minY:	65,
			maxY:	130
		},
		'8':  {BlockID:  13,			//Gravel
			chance:   5,
			minSize:   6,
			maxSize:	16,
			minY:	25,
			maxY:	90
		},
		'9':  {BlockID:  82,			//Clay
			chance:   5,
			minSize:   4,
			maxSize:	12,
			minY:	50,
			maxY:	110
		},
		'10':  {BlockID:  3,			//Dirt
			chance:   0,
			minSize:   4,
			maxSize:	12,
			minY:	60,
			maxY:	175
		},
		'11':  {BlockID:  45,			//Bricks - Test Item
			chance:   0,
			minSize:   10,
			maxSize:	150,
			minY:	50,
			maxY:	60
		}
	};

	trees = {
		'bush':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:   6,
			maxChg:	0,
			leafSize: 5,
			mySub:	CreateBush
		},
		'small':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:   6,
			maxChg:	0,
			leafSize: 5,
			mySub:	CreateSmallTree
		},
		'medium':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:  4,
			maxChg:	8,
			branchSize:	.5,
			leafSize:	7,
			mySub:	CreateMediumTree
		},
		'large':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:  12,
			maxChg:	18,
			branchSize:	.1,
			branchProb:	.5,
			leafSize:	7,
			mySub:	CreateLargeTree
		},
		'branched':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:  25,
			maxChg:	1,
			branchSize1:	.3,
			branchSize2:	.15,
			branchSize3:	.1,
			branchProb1:	.7,
			branchProb2:	.7,
			branchProb3:	.7,
			leafSize:	13,
			mySub:	CreateBranchedTree
		},			
		'rainforest':  {
			woodBlock:  new BaseBlock(BlockID.LOG, 3),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 7),			
			minSize:  20,
			maxChg:	8,
			branchSize:	.15,
			branchProb:	.6,
			branchHeight: .6,
			leafSize:	12,
			mySub:	CreateRainforestTree
		},
		'palm':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:  5,
			maxChg:	4,
			branchSize:	.5,
			leafSize:	3,
			mySub:	CreatePalmTree
		},
		'stick':  {
			woodBlock:  new BaseBlock(BlockID.LOG, 0),
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),				
			minSize:  1,
			density:	.1,
			maxChg:	3,
			mySub:	CreateStickTree
		},
		'mushroom':  {
			woodBlock:  new BaseBlock(35, 4),			
			leafBlock:   new BaseBlock(35, 14),			
			minSize:  15,
			maxChg:	40,
			leafSize:	25,
			mySub:	CreateMushroom
		},
		'spike':  {
			woodBlock:  new BaseBlock(BlockID.LOG),			
			leafBlock:   new BaseBlock(BlockID.LEAVES, 4),			
			minSize:  25,
			maxChg:	1,
			branchSize1:	.3,
			branchSize2:	.15,
			branchSize3:	.1,
			branchProb1:	.7,
			branchProb2:	.7,
			branchProb3:	.7,
			leafSize:	13,
			mySub:	CreateSpikeTree
		}		
	}
	
	shapes = {
		'PalmLeaf':  {
			offset:	Vector(0,0,0),
			angle: 0,
			src: "static",
			shape: {
				'1': {vec: Vector(0,1,0), id: "18:4"},
				'2': {vec: Vector(0,2,0), id: "18:4"},
				'3': {vec: Vector(1,1,0), id: "18:4"},
				'4': {vec: Vector(1,2,0), id: "18:4"},
				'5': {vec: Vector(2,1,0), id: "18:4"},
				'6': {vec: Vector(3,1,0), id: "18:4"},
				'7': {vec: Vector(3,0,0), id: "18:4"},
				'8': {vec: Vector(4,0,0), id: "18:4"},
				'9': {vec: Vector(4,-1,0), id: "18:4"},
				'10': {vec: Vector(1,1,-1), id: "18:4"},
				'11': {vec: Vector(1,1,1), id: "18:4"}
			},
		},
		'Test':  {
			offset:	Vector(0,0,0),
			angle: 0,
			src: "static",
			shape: {
				'1': {vec: Vector(0,1,0), id: "18:4"},
				'2': {vec: Vector(0,2,0), id: "18:4"},
				'3': {vec: Vector(1,1,0), id: "18:4"},
				'4': {vec: Vector(1,2,0), id: "18:4"},
				'5': {vec: Vector(2,1,0), id: "18:4"},
				'6': {vec: Vector(3,1,0), id: "18:4"},
				'7': {vec: Vector(3,0,0), id: "18:4"},
				'8': {vec: Vector(4,0,0), id: "18:4"},
				'9': {vec: Vector(4,-1,0), id: "18:4"},
				'10': {vec: Vector(1,1,-1), id: "18:4"},
				'11': {vec: Vector(1,1,1), id: "18:4"},
				'12': {vec: Vector(2,2,0), id: "5:1"},
				'13': {vec: Vector(4,1,0), id: "5:1"},
				'14': {vec: Vector(3,2,0), id: "50:1"},
				'15': {vec: Vector(5,1,0), id: "50:1"}
			},
		}		

	}

	blocks = {
		'plants': {
			list: {
					'0':  {block: new BaseBlock(31, 1), chance: 100, },
					'1':  {block: new BaseBlock(31, 2), chance: 100, },
					'2':  {block: new BaseBlock(37, 0), chance: 5, },
					'3':  {block: new BaseBlock(38, 0), chance: 5, },
					'4':  {block: new BaseBlock(86, 0), chance: .2, },
					'5':  {block: new BaseBlock(103, 0), chance: .2,}
			}
		},
		'ruin': {
			list: {
					'0':  {block: new BaseBlock(98, 0), chance: 100, },
					'1':  {block: new BaseBlock(98, 1), chance: 100, },
					'2':  {block: new BaseBlock(98, 2), chance: 100, },
					'3':  {block: new BaseBlock(98, 3), chance: 5, },
					'4':  {block: new BaseBlock(109, 0), chance: 10, },
					'5':  {block: new BaseBlock(109, 4), chance: 10, },
					'6':  {block: new BaseBlock(44, 5), chance: 5,},
					'7':  {block: new BaseBlock(44, 13), chance: 5,},
					'8':  {block: new BaseBlock(97, 2), chance: 1,}
			}
		}		
	}
	
	text = {
		'Black': "\u00A70",
		'DarkBlue': "\u00A71",
		'DarkGreen': "\u00A72",
		'DarkAqua': "\u00A73",
		'DarkRed': "\u00A74",
		'Purple': "\u00A75",
		'Gold': "\u00A76",
		'Grey': "\u00A77",
		'DarkGrey': "\u00A78",
		'Indigo': "\u00A79",
		'BrightGreen': "\u00A7a",
		'Aqua': "\u00A7b",
		'Red': "\u00A7c",
		'Pink': "\u00A7d",
		'Yellow': "\u00A7e",
		'White': "\u00A7f",
		'Random': "\u00A7k",
		'Bold': "\u00A7l",
		'Strike': "\u00A7m",
		'Underline': "\u00A7n",
		'Italics': "\u00A7o",		
		'Reset': "\u00A7r",
		'Not': "\u00AC",
		'Bar': "\u007C",
		'Arrow': "\u00BB",
	}
	
	tools = {
		'0':  {name:  "Help",			
			note:  "General, or command specific info.",			
			args:   ["command"],
			aFlags:	[""],
			keys: 	["help", "h", "?"],
			mySub:	HelpText,
		},
		'1':  {name:  "Command List(Short)",			
			note:  "List Commands - Short",			
			args:  [""],
			aFlags:	[""],
			keys:  ["list", "shortlist"],
			mySub:	CommandListShort,
		},
		'2':  {name:  "Command List(Long)",			
			note:  "List Commands - Long",			
			args:  [""],
			aFlags:	[""],
			keys:  ["commands", "command", "longlist"],
			mySub:	CommandListLong,
		},
		'3':  {name:  "Clear Nature",			
			note:  "Destroys and clears all natural blocks.",			
			args:  ["size"],
			aFlags:	["s"],
			keys:  ["clear", "killnature", "kill", "kn", "clearnature"],
			mySub:	ClearNature,
		},
		'4':  {name:  "Tree",			
			note:  "Creates a randomly generated tree type.",			
			args:   ["treeType", "size", "maxChg", "woodID", "leafID", "clump"],
			aFlags:	["", "s", "m", "w", "l", "c"],
			keys: 	["tree"],
			mySub:	BuildTree,
		},
		'5':  {name:  "Grass Patch",			
			note:  "Creates a random patch of long grass(super bonemeal!)",			
			args:  ["size", "density"],
			aFlags:	["s", "d"],
			keys:  ["grass", "grasspatch", "bonemeal"],
			mySub:	BuildGrassPatch,
		},
		'6':  {name:  "Forest",			
			note:  "Creates a random patch of blocks to random custom heights.",			
			args:  ["treeType", "size",  "density",  "minTree,max", "woodID", "leafID", "clump"],
			aFlags:	["", "s", "d", "m", "w", "l", "c"],
			keys:  ["forest", "trees", "treepatch"],
			mySub:	BuildForest,
		},		
		'7':  {name:  "Overlay",			
			note:  "Covers all natural items to custom blocks and depths.",			
			args:  ["size", "topBlock,depth", "mid,depth", "end,depth", "all"],
			aFlags:["s", "t", "m", "e", "a"],
			keys:  ["overlay", "overlaypatch", "over"],
			mySub:	BuildOverlayPatch,
		},			
		'8':  {name:  "Spike",			
			note:  "Creates a custom spike wherever clicked.",			
			args:  ["baseSize", "block", "minLength,maxChg"],
			aFlags:["s", "b", "l"],
			keys:  ["spike", "cone"],
			mySub:	BuildSpike,
		},
		'9':  {name:  "Vine",			
			note:  "Smart custom vine brush.",			
			args:  ["size", "density", "length", "block", ],
			aFlags:["s", "d", "l", "b"],
			keys:  ["vine", "vines"],
			mySub:	BuildVines,
		},
		'10':  {name:  "Test",			
			note:  "Function Testing Area",			
			args:  [""],
			aFlags:	[""],
			keys:  ["test"],
			mySub:	BuildTest,
		},
		'11':  {name:  "Save Shape",			
			note:  "Save the current selection to shape file.",			
			args:  ["fileName", "excludeBlock"],
			aFlags:	["", "!"],
			keys:  ["save"],
			mySub:	saveShape,
		},
		'12':  {name:  "Shape",			
			note:  "Load a shape object from the selection, or shape file.",			
			args:  ["fileName", "angleLock", "excludeID", "select"],
			aFlags:["", "<", "!", "$"],
			keys:  ["shape", "load"],
			mySub:	BuildShape,
		},	
		'13':  {name:  "Line",			
			note:  "Draws a custom line in single, continous, or fixed origin mode.",			
			args:  ["mode", "size", "block", "extendCnt"],
			aFlags:	["m", "s", "b", "e"],
			keys:  ["line", "lines"],
			mySub:	BuildLine,
		},
		'14':  {name:  "Paint",			
			note:  "Attempts to paint shape objects in rapidfire mode.",			
			args:  ["fileName", "angleLock", "excludeID"],
			aFlags:["", "<", "!"],
			keys:  ["paint", "painter", "draw"],
			mySub:	BuildShape,
		},
		'15':  {name:  "Flatten",			
			note:  "Level all terrain to a custom height.",			
			args:  ["size", "depth", "surfaceBlock"],
			aFlags:["s", "d", "b"],
			keys:  ["flatten", "flat", "level"],
			mySub:	BuildFlat,
		},	
		'16':  {name:  "Shape Kit",			
			note:  "Loads, and binds a list of custom shapes.",			
			args:  ["fileName", "angleLock", "excludeID", "select", "random"],
			aFlags:["", "<", "!", "$", "r"],
			keys:  ["kit","shapekit"],
			mySub:	BuildShapeKit,
		},
		'17':  {name:  "Platform",			
			note:  "Creates a custom platform, or path under your feet.",			
			args:  ["size", "block"],
			aFlags:	["s", "b"],
			keys:  ["platform", "path"],
			mySub:	BuildPlatform,
		},
		'18':  {name:  "Mirror",			
			note:  "Mirrors your current selection around a selected point.",			
			args:  ["shift", "delete"],
			aFlags:	["s", "d"],
			keys:  ["mirror"],
			mySub:	BuildMirror,
		},
		'19':  {name:  "Biome",			
			note:  "Creates a brush that paints a custom biome (multiplayer only)",			
			args:  ["biome", "size"],
			aFlags:	["b", "#"],
			keys:  ["biome"],
			mySub:	BuildBiome,
		},
		'20':  {name:  "Laser",			
			note:  "Shoots a custom beam of blocks from your fingertips!",			
			args:  ["size", "depth", "aboveMat", "belowMat"],
			aFlags:	["s", "d", "a", "b"],
			keys:  ["laser", "beam"],
			mySub:	BuildLaser,
		},
		'21':  {name:  "Revolve",			
			note:  "Revolves a 2D slice selection around a center point.",			
			args:  ["count", "useBlock"],
			aFlags:	["c", "b"],
			keys:  ["revolve"],
			mySub:	BuildRevolve,
		},
		'22':  {name:  "Rotate",			
			note:  "Rotates a 3D selection to a set angle or # of increments.",			
			args:  ["items/-angleInc", "resolution", "single"],
			aFlags:	["i", "r", "s"],
			keys:  ["rotate"],
			mySub:	BuildRotate,
		},
		'23':  {name:  "Erode",			
			note:  "Erode the terrain away using a custom face setting.",			
			args:  ["size", "maxFaces", "iterations"],
			aFlags:	["s", "f", "i"],
			keys:  ["erode"],
			mySub:	BuildErode,
		},
		'24':  {name:  "Fill",			
			note:  "Fill the terrain in using a custom face setting.",			
			args:  ["size", "maxFaces", "iterations"],
			aFlags:	["s", "f", "i"],
			keys:  ["fill"],
			mySub:	BuildFill,
		},
		'25':  {name:  "Smart Wand",			
			note:  "A smarter, more user friendly selection wand.",			
			args:  [""],
			aFlags:	[""],
			keys:  ["wand"],
			mySub:	BuildWand,
		},
		'26':  {name:  "Ore Generator",			
			note:  "Generates new veins of ore based on custom settings.",			
			args:  ["size", "overBlock", "density", "region"],
			aFlags:	["s", "b", "d", "r"],
			keys:  ["ore", "ores"],
			mySub:	BuildOre,
		},
		'27':  {name:  "Fragment",			
			note:  "Creates a fragmented sphere shape.",			
			args:  ["size", "block", "density", "hollow"],
			aFlags:	["s", "b", "d", "h"],
			keys:  ["fragment", "frag"],
			mySub:	BuildFragment,
		},
		'28':  {name:  "Spawner",			
			note:  "Creates an entity mob spawner. (multiplayer only)",			
			args:  ["spawnerType"],
			aFlags:	[""],
			keys:  ["spawner", "spawn"],
			mySub:	BuildSpawner,
		},
		'29':  {name:  "Kill",			
			note:  "A special brush that kills entites. (Unstable!) (multiplayer only)",			
			args:  ["entityType", "size"],
			aFlags:	["", "s"],
			keys:  ["kill", "killer"],
			mySub:	BuildKiller,
		},
		'30':  {name:  "Pattern",			
			note:  "Replaces blocks with a custom predefined set.",			
			args:  ["blockSet", "size"],
			aFlags:	["b", "s"],
			keys:  ["pattern", "pat", "replace"],
			mySub:	BuildPattern,
		},
		'31':  {name:  "Array",			
			note:  "Arrays a selection up to 3 different directions.",			
			args:  ["totalA", "totalB", "totalC"],
			aFlags:	["a", "b", "c"],
			keys:  ["array", "stack"],
			mySub:	BuildArray,
		},
		'32':  {name:  "Map",			
			note:  "Saves a map of the area around you to a image file.",			
			args:  ["fileName", "size", "heightMap"],
			aFlags:	["", "s", "h"],
			keys:  ["map"],
			mySub:	BuildMap,
		},	
		'33':  {name:  "Flip",			
			note:  "Flips the current selection around the clicked point.",			
			args:  ["shift", "delete"],
			aFlags:	["s", "d"],
			keys:  ["flip"],
			mySub:	BuildFlip,
		},
		'34':  {name:  "Box",			
			note:  "Creates a custom sized rectangle box brush.",			
			args:  ["xSize", "ySize", "zSize", "hollow", "angled", "block", "insideBlock"],
			aFlags:	["x", "y", "z", "h", "a", "b", "i"],
			keys:  ["box", "rect", "rectangle"],
			mySub:	BuildBox,
		},
		'35':  {name:  "Ellipse",			
			note:  "Creates a custom size ellipse brush",			
			args:  ["xSize", "ySize", "zSize", "hollow", "angled", "block", "insideBlock"],
			aFlags:	["x", "y", "z", "h", "a", "b", "i"],
			keys:  ["ellipse"],
			mySub:	BuildEllipse,
		},
		'36':  {name:  "Spiral",			
			note:  "Creates a custom spiral object.",			
			args:  ["radius/-growth", "stretch", "count", "flip", "double"],
			aFlags:	["r", "s", "c", "f", "d"],
			keys:  ["spiral"],
			mySub:	BuildSpiral,
		},
		'37':  {name:  "Minesweeper",			
			note:  "Play a game of Minesweeper, Minecraft style!",			
			args:  ["xSize", "ySize", "mines", "wool", "cheat", "begginer/intermediate/expert", "hardcore"],
			aFlags:	["x", "y", "m", "w", "c", "b/i/e", "h"],
			keys:  ["minesweeper", "mine", "sweeper"],
			mySub:	BuildMineSweeper,
		},	
		'38':  {name:  "Flood Fill",			
			note:  "Creates a block based flood filling tool.",			
			args:  ["size", "block", "gap"],
			aFlags:	["s", "b", "g"],
			keys:  ["flood", "flooder", "floodfill"],
			mySub:	BuildFloodFill,
		},
		'39':  {name:  "Windows",			
			note:  "Creates a a windows environment",			
			args:  ["reload"],
			aFlags:	["#"],
			keys:  ["window", "windows", "win"],
			mySub:	BuildWindows,
		},
		'40':  {name:  "Sphere",			
			note:  "Creates a sphere shape out of the specified block.",			
			args:  ["block", "size", "hollow"],
			aFlags:	["b", "s", "h"],
			keys:  ["sphere", "sp", "round"],
			mySub:	BuildSphere,
		},		
		
	}
	
}

function InitializeBrush() {
	
	try{
		if (mode != -1) {	//check to see if the mode exists or not
			
			if (checkFlag("?") != false ) { 
				HelpText(1); 
				localSession.setTool(player.getItemInHand(), null);
				return;
			}
			brushTool.setBrush(brush, "worldedit.brush.build");
			if (tools[mode].mySub(player.getBlockIn(), session) != true) {
				player.print(text.Gold + tools[mode].name + text.White + " brush bound to " + text.Gold + ItemType.toHeldName(player.getItemInHand()) + ". " );
				player.print(text.White + text.Italics + "Ready for first point.");
			}
		}
		else {
			var modeStr = argv.length > 1 ? argv[1] : 2;
			player.print(text.Red + modeStr + text.White + " mode not found. Type " + text.Gold + "/cs build list" + text.White + " for commands.");
		}
	}
	catch(e) {
		printError("Initialize Brush", e); 
	}	
}

function loadShape(vec) {
	
	if ((argv.length > 2) && (String(argv[2]) != "-")) {		//if a file argument was specified
		
		var fileArg = String(argv[2]);
		var file;
		var remoteFile = false;
		if (checkFlag("$")) {
			file = openFileDialog();
			if (file == undefined) return;
			var wwwIndex = file.getAbsolutePath().indexOf("www.");
			fileArg = wwwIndex == -1 ? file.getName() : ("http://" + file.getAbsolutePath().slice(wwwIndex).toLowerCase().replace(/\\/g,"/"));
		}
		
		if (fileArg.indexOf("www.") != -1) {
			fileArg = ("http://" + fileArg.slice(fileArg.indexOf("www.")).toLowerCase().replace(/\\/g,"/"));
			remoteFile = true;
		}
		
		
		var extStr = String(fileArg.slice(fileArg.indexOf(".")).toLowerCase());
	
		if (extStr == ".shp" || (extStr != ".bo2" && extStr != ".sch" && extStr != ".schematic")) {		// shape file type
			
			if(remoteFile == true) {
				var fileName = fileArg.slice(0, fileArg.length-4);
				try {
					var tmpStr = loadRemoteFile(fileArg, 1);
				}
				catch(e) {
					player.print(text.Red + "Error! " + text.Gold + "Could not find shape file: " + text.White + text.Italics + fileName + ".shp");
					return false;
				}
			
			}
			else {

				var fileName = fileArg;
				if (extStr == ".shp") {fileName = fileArg.slice(0, fileArg.length-4).toLowerCase()};

				file = file == undefined ? context.getSafeFile("shapes", String(fileName) + '.shp') : file;
				if(!file.exists()){
					player.print(text.Red + "Error! " + text.Gold + "Could not find shape file: " + text.White + text.Italics + file);
					return false;
				}
				var tmpStr = loadFile(file, 1);
			}
			
			var tmpShape = parseShapeFile(tmpStr);
			player.print(text.Gold + tmpShape['TMP'].shape.length + text.White + " blocks loaded from file: " + text.Gold + fileName + ".shp");
			player.print(text.Gold + tools[mode].name + text.White + " brush bound to " + text.Gold + ItemType.toHeldName(player.getItemInHand()) + ". " );
			player.print(text.White + text.Italics + "Ready to place shape object.");
			
		}
		else if (extStr == ".bo2") {		// bo2 file type

			if(remoteFile == true) {
				var fileName = fileArg.slice(0, fileArg.length-4);
				try {
					var tmpStr = loadRemoteFile(fileArg, 1);
				}
				catch(e) {
					player.print(text.Red + "Error! " + text.Gold + "Could not find shape file: " + text.White + text.Italics + fileName + ".bo2");
					return false;
				}
			}
			else {

				var fileName = fileArg;
				file = file == undefined ? context.getSafeFile("bo2s", String(fileName)) : file;
				if(!file.exists()){
					player.print(text.Red + "Error! " + text.Gold + "Could not find bo2 file: " + text.White + text.Italics + file);
					return false;
				}
				
				var tmpStr = loadFile(file, 2);
				
			}
			var tmpShape = parseBO2File(tmpStr);
		
			player.print(text.Gold + tmpShape['TMP'].shape.length + text.White + " blocks loaded from file: " + text.Gold + fileName);
			player.print(text.Gold + tools[mode].name + text.White + " brush bound to " + text.Gold + ItemType.toHeldName(player.getItemInHand()) + ". " );
			player.print(text.White + text.Italics + "Ready to place shape object.");
		}
		else if (extStr == ".sch" || extStr == ".schematic") {		// schematic file type
			var fileName = String(fileArg + (extStr == ".sch" ? "ematic" : "")) ;
			file = file == undefined ? context.getSafeFile("schematics", fileName) : file;
			if(!file.exists()){
				player.print(text.Red + "Error! " + text.Gold + "Could not find schematic file: " + text.White + text.Italics + file);
				return false;
			}
			
			var format = SchematicFormat.getFormat(file);
			var tmpClip = format.load(file);
			var tmpShape = parseClipboard(tmpClip);
		
			player.print(text.Gold + tmpShape['TMP'].shape.length + text.White + " blocks loaded from file: " + text.Gold + fileName);
			player.print(text.Gold + tools[mode].name + text.White + " brush bound to " + text.Gold + ItemType.toHeldName(player.getItemInHand()) + ". " );
			player.print(text.White + text.Italics + "Ready to place shape object.");
		}
		
	}
	else {		//no file specified, use selection
		if (context.getSession().isSelectionDefined(context.getSession().getSelectionWorld()) != true) 	return false;
		var world = context.getSession().getSelectionWorld();
		var region = context.getSession().getSelection(world);
		var tmpStr = saveShape(vec, session);
		var tmpShape = parseShapeFile(tmpStr);
		player.print(text.Gold + tmpShape['TMP'].shape.length + text.White +" blocks loaded from current selection.");
		player.print(text.White + text.Italics + "Ready to place shape object.");
	}
	
	myShape = tmpShape;
	return;

}

function loadShapeKit(vec, session, kitList) {

	for (inc in kitList) {
		printDebug("inc", inc);
		printDebug("kitList[inc]", kitList[inc]);
		var fileArg = kitList[inc].shapeFile;
		printDebug("fileArg", fileArg);
		var aStr = String(fileArg).slice(String(fileArg).length-4).toLowerCase();
		var type = aStr == ".bo2" ? 2 : 1;

		var extStr = String(fileArg.slice(fileArg.indexOf(".")).toLowerCase());
		
		if (extStr == ".shp" || (extStr != ".bo2" && extStr != ".sch" && extStr != ".schematic")) {		// shape file type
			
			var fileName = fileArg;
			var file = context.getSafeFile("shapes", String(fileName));
			if(!file.exists()){
				player.print(text.Red + "Error! " + text.Gold + "Could not find shape file: " + text.White + text.Italics + file);
				return false;
			}			
						
			var tmpStr = loadFile(file, 1);
			var tmpShape = parseShapeFile(tmpStr);
			player.print(text.White + "Shape file: " + text.Gold + fileName + text.White + " bound to " + text.Gold + ItemType.toHeldName(kitList[inc].item));
			if (inc == 0 && !checkFlag("r")) player.giveItem(kitList[inc].item, 1);
		}
		else if (extStr == ".bo2") {		// bo2 file type
			
			var fileName = fileArg;
			var file = context.getSafeFile("bo2s", String(fileName));
			if(!file.exists()){
				player.print(text.Red + "Error! " + text.Gold + "Could not find bo2 file: " + text.White + text.Italics + file);
				return false;
			}
			
			var tmpStr = loadFile(file, 2);
			var tmpShape = parseBO2File(tmpStr);
			player.print(text.White + "Shape file: " + text.Gold + fileName + text.White + " bound to " + text.Gold + ItemType.toHeldName(kitList[inc].item));
			player.giveItem(kitList[inc].item, 1);
		}
		else if (extStr == ".sch" || extStr == ".schematic") {		// schematic file type
			
			var fileName = fileArg;
			var file = context.getSafeFile("bo2s", String(fileName));
			if(!file.exists()){
				player.print(text.Red + "Error! " + text.Gold + "Could not find bo2 file: " + text.White + text.Italics + file);
				return false;
			}
			
			var tmpStr = loadFile(file, 2);
			var tmpShape = parseBO2File(tmpStr);
			player.print(text.White + "Shape file: " + text.Gold + fileName + text.White + " bound to " + text.Gold + ItemType.toHeldName(kitList[inc].item));
			player.giveItem(kitList[inc].item, 1);
		}
		
		myShape[inc] = tmpShape['TMP'];
	
	}
	player.print(text.White + text.Italics + "Finished loading " + myShape.length + " shapes!"); 
	
}

function saveShape(vec) {
	if (vecList.length == 0) { 
		if (argv.length < 3 && tools[mode].name == "Save Shape")
			player.print(text.Red + "Error:" + text.White + " You need to specify a file name to save under.");
		if (context.getSession().isSelectionDefined(context.getSession().getSelectionWorld()) != true) 
			player.print(text.Red + "Error: " + text.White + "You must have a region selected to use this!");
		player.print(text.White + text.Italics + "Click to specify shape origin point.");
		return true;
	}	
		
	if ((argv.length > 2) && (String(argv[2]) != "-")) {
		saveName = argv[2];
	}
	else {
		if (tools[mode].name == "Save Shape") {
			player.print(text.Red + "Error:" + text.White + " You need to specify a file name to save under.");
			return false;
		}
	}
	
	var ignore = checkFlag("!") ? parseBlock(checkFlag("!")) : -1;
	
	if (context.getSession().isSelectionDefined(context.getSession().getSelectionWorld()) != true)  {
		player.print(text.Red + "Error: " + text.White + "You must have a region selected to use this!");
		return false;	
	}
	var world = context.getSession().getSelectionWorld();
	var region = context.getSession().getSelection(world);

	var angle = (parseInt(getDirection().rightAngle)+270) % 360;
	//var angleStr = "^" + String(angle) + "^";
	
	var mergeStr = "^" + String(angle) + "^" + "#0,0,0#|";
	var blockCnt = 0;
	
	for (var x = 0; x < region.getWidth(); x++) {
		for (var y = 0; y < region.getHeight(); y++) {
			for (var z = 0; z < region.getLength(); z++) {
				
				var tmpVec = region.getMinimumPoint().add(x, y, z);
				var block = session.getBlock(tmpVec);
				if (ignore != -1) {
					if (block.getType() == ignore.getType()) {continue;}
				}
				var blockStr = String(block.getType()) + ":" + String(block.getData());
				var vecStr = String(tmpVec.getX()-vec.getX()) + "," + String(tmpVec.getY()-vec.getY()) + "," + String(tmpVec.getZ()-vec.getZ());
				
				mergeStr = mergeStr + (blockStr + "@" + vecStr + "|");
				blockCnt++;
			}
		}
	}
	
	mergeStr += "%";
	
	if (tools[mode].name == "Save Shape") {
		var file = context.getSafeFile("shapes", String(saveName) + '.shp');
		saveFile(saveName, mergeStr);
		player.print(text.Gold + blockCnt + text.White + " blocks saved to shape file " + text.Gold + saveName + ".shp" + text.Red + " @ " + text.White + text.Italics + file);
	}
	else {
		return mergeStr;
	}
	//player.print(blockCnt + " totals blocks saved. [" + mergeStr.length + " total chars]");
	
}

function loadFile(file, type) {
	
	if(!file.exists()){
		return false;
	}
	
	var buffer = new BufferedReader(new FileReader(file));
	var bufStr = new Array();

	while (line = buffer.readLine()) {
		bufStr = bufStr + line;
		if (type == 2 || type == 3) {
			bufStr = bufStr + "\n";
		}
	}
	buffer.close();
	return bufStr;

}

function loadRemoteFile(file, type) {

    var url = new URL(String(String(file)));
	var buffer = new BufferedReader(new InputStreamReader(url.openStream()));
	var bufStr = new Array();

	while (line = buffer.readLine()) {
		bufStr = bufStr + line;
		if (type == 2 || type == 3) {
			bufStr = bufStr + "\n";
		}
	}
	buffer.close();
	return bufStr;

}

function saveFile(fileName, textStr) {

	var file = context.getSafeFile("shapes", String(fileName) + '.shp');
	
	if(!file.exists()){
		file.createNewFile();
	}
	
	buffer = new BufferedWriter(new FileWriter(file));
	buffer.write(String(textStr));
	buffer.close();
	
}

function loadConfigKey(key, file) {
	
	if (typeof file == 'undefined') {
		//file = new java.io.File("Default Path");
		file = context.getSafeFile("/", 'buildcommands.properties');
		//check for spc and bukkit and set path accordingly
	}
	
	if (!file.exists()) {
		return false;
	}
	
	var buffer = new BufferedReader(new FileReader(file));
	var bufStr;

	while (line = buffer.readLine()) {
		var keyIndex = line.indexOf(key);
		if (keyIndex != -1) {
			var signIndex = line.indexOf("=", keyIndex+ key.length);
			if (signIndex != -1) {
				var endText = line.slice(signIndex+1);
				
				while (endText.slice(0,1) == " ") {
					endText = endText.slice(1);
				}
				
				if (endText.length > 0) {							// for config saving, make sure to replace the line with the next text then add it to the bufStr instead of the normal loaded line
					buffer.close();
					return endText;
				}
				else { 
					buffer.close();
					return false;
				}
			}
			else {
				buffer.close();
				return false; 
			}

		}
		bufStr = bufStr + line + "\n";
	}
	buffer.close();
	return false;
}

function saveConfigKey(key, value, file) {
	
	if (typeof file == 'undefined') {
		file = context.getSafeFile("/", 'buildcommands.properties');
		//check for spc and bukkit and set path accordingly
	}
	
	if (!file.exists()) {
		file.createNewFile();
	}
	var buffer = new BufferedReader(new FileReader(file));
	var bufStr = "";
	var newLine = "";
	var keyFound = false;

	while (line = buffer.readLine()) {
		var keyIndex = line.indexOf(key);
		if (keyIndex != -1) {
			newLine = String(key + "=" + value);
			keyFound = true;
		}
		if (newLine == "") bufStr = bufStr + String(line + "\n");
		else {
			bufStr = bufStr + String(newLine + "\n");
			newLine = "";
		}
		
	}
	
	if (keyFound == false) bufStr = bufStr + String(key + "=" + value + "\n");
	buffer.close();
	//print("bufstr = " + bufStr);
	var buffer = new BufferedWriter(new FileWriter(file));
	buffer.write(String(bufStr));
	buffer.close();
	return;	
}

function parseShapeFile(shapeStr) {

	var tmpShape = new Array();
	
	tmpShape = {
		'TMP':  {
			offset:	Vector(0,0,0),
			shape: [],
			src: "shape"
		}
	}
	
		//	 |17:4@25,3,-6|
	var cnt = 0;
	var inc = 0;
	while (inc <= shapeStr.length) {
	
		if (shapeStr.slice(inc+1, inc+2) == "%") {
	
			break;
		}
		else if (shapeStr.slice(inc, inc+1) == "^") {
			
			var anglePos = shapeStr.indexOf("^", inc+1);
			var angleInc = anglePos+1;
			var anglePos2 = anglePos;
			tmpShape['TMP'].angle = String(shapeStr.slice(inc+1, anglePos2));
			inc = angleInc;
		}
		else if (shapeStr.slice(inc, inc+1) == "#") {
			
			var offsetPos = shapeStr.indexOf("#", inc+1);
			var offsetInc = offsetPos+1;
			var offsetPos2 = offsetPos;
			tmpShape['TMP'].offset = parseVector(String(shapeStr.slice(inc+1, offsetPos2)));
			inc = offsetInc;
		}
		else if (shapeStr.slice(inc, inc+1) == "|") {

			var blockPos = shapeStr.indexOf("@", inc+1);
			var blockInc = blockPos;
			var blockPos2 = blockPos;
			var block = parseBlock(String(shapeStr.slice(inc+1, blockPos2)));
					
			var vecPos = shapeStr.indexOf("|", blockInc);
			var vecInc = vecPos+1;
			var vecPos2 = vecPos;
			var vec = parseVector(String(shapeStr.slice(blockPos+1, vecPos2)));
			
			var abc = "'" + cnt + "'";
			
			idStr = block.getType() + ":" + block.getData();
			
			tmpShape['TMP'].shape.push({vec: vec, id: idStr});
			
			inc = vecInc-1;
			cnt++;
		}
		else {

			inc++;
		}
		

	}
	return tmpShape;
}

function parseBO2File(shapeStr) {

	var tmpShape = new Array();
	
	tmpShape = {
		'TMP':  {
			offset:	Vector(0,0,0),
			angle: 0,
			shape: [],
			src: "bo2"
		}
	}
	
	var inc = shapeStr.indexOf("[DATA]");

	while (inc <= shapeStr.length) {
		if (shapeStr.slice(inc, inc+1) == "\n") {

			var vecPos = shapeStr.indexOf(":", inc+1);
			if (vecPos != -1) {
			
				var vecInc = vecPos;
				var vecPos2 = vecPos;
				var vec = parseVector(String(shapeStr.slice(inc+1, vecPos2)));
				vec = Vector(vec.getX(), vec.getZ()+1, vec.getY());
				
				var blockPos = shapeStr.indexOf("\n", vecInc);
				var blockInc = blockPos+1;
				var blockPos2 = blockPos;
				
				var block = parseBlock(String(shapeStr.slice(vecPos+1, blockPos2)));
				var idStr = block.getType() + ":" + block.getData();

				tmpShape['TMP'].shape.push({vec: vec, id: idStr});
				
				inc = blockInc-1;
			}
			else  {
				inc++
			}
		}
		else {
			inc++;
		}
	}
	return tmpShape;
}

function parseKitFile(kitStr) {

	var tmpKit = [];
	var inc = 0;
	kitStr = "\n" + kitStr + "\n";

	while (inc <= kitStr.length) {
		if (kitStr.slice(inc, inc+1) == "\n") {

			var shapePos = kitStr.indexOf(":", inc+1);
			if (shapePos != -1) {
				var shapeInc = shapePos;
				var shapePos2 = shapePos;
				var fileStr = String(kitStr.slice(inc+1, shapePos2));

				var itemPos = kitStr.indexOf("\n", shapeInc);
				var itemInc = itemPos+1;
				var itemPos2 = itemPos;
				
				var itemID = parseInt(kitStr.slice(shapePos+1, itemPos2));
				tmpKit.push ({shapeFile: fileStr, item: itemID});

				inc = itemInc-1;
			}
			else  {
				inc++
			}
		}
		else {
			inc++;
		}
	}
	return tmpKit;
}

function parseClipboard(clipItem) {
	
	if (clipItem == undefined || clipItem == null) {
		try {
			var clipObj = localSession.getClipboard();
			clipObj.copy(session);
		}
		catch(e) {
			player.print(text.Red + "Error: " + text.White + "You must copy a selection to the clipboard before using this.");
			return false;
		}
	}
	else {
		clipObj = clipItem;
	}
	
	//clipShape = parseClipboard(cubClip);
	//print("Schematic Size: " + cubClip.getSize());
	//print("Total Blocks: " + clipShape['TMP'].shape.length);
	
	clipSize = clipObj.getSize();
	var tmpShape = new Array();
	var clipOffset = Vector(Math.floor(clipSize.getX()/2), 1, Math.floor(clipSize.getZ()/2));
	
	tmpShape = {
		'TMP':  {
			offset:	clipOffset,
			angle: "0",
			src: "schematic",
			shape: []
		}
	}
	for (var x = 0; x < clipSize.getX(); x++) {
		for (var y = 0; y < clipSize.getY(); y++) {
			for (var z = 0; z < clipSize.getZ(); z++) {
				vec = Vector(x,y,z);
				block = clipObj.getPoint(vec);
				idStr = block.getType() + ":" + block.getData();		
				tmpShape['TMP'].shape.push({vec: vec, id: idStr});
			
			}
		}
	}
	
	//tmpShape['TMP'].offset = Vector(Math.floor(clipSize.getX()/2),1,Math.floor(clipSize.getZ()/2));
	return tmpShape;
	//idStr = block.getType() + ":" + block.getData();		
	//tmpShape['TMP'].shape.push({vec: vec, id: idStr});	
}

function parseBlock(blockStr) {
	
	blockStr = String(blockStr.replace(".",":"));
	
	var mat = worldEdit.getBlockPattern(player, blockStr);
	return mat.next(zVec);
	
	
	
	pos = blockStr.indexOf(":");
	
	if (pos == -1) {return new BaseBlock(parseInt(blockStr), 0);}

	id = blockStr.slice(0, pos);
	data = blockStr.slice(pos+1);

	return new BaseBlock(parseInt(id), parseInt(data));

}

function parseVector(blockStr) {

	blockStr = blockStr.replace(/["'\(\)]/g, "");
	var pos = blockStr.indexOf(",", 0);
	var pos2 = blockStr.indexOf(",", pos+1);
	
	var x = parseInt(blockStr.slice(0, pos));
	var y = parseInt(blockStr.slice(pos+1, pos2));
	var z = parseInt(blockStr.slice(pos2+1));
	
	return Vector(x, y, z);
}

function parseBlockExtra(blockStr) {

	pos = blockStr.indexOf(":");
	pos2 = blockStr.indexOf(",");
	var blockExtra = [];

	if ((pos != -1) && (pos2 != -1)) {
	
		blockExtra = {
			block:	new BaseBlock(parseInt(blockStr.slice(0, pos)), blockStr.slice(pos+1, pos2)),	
			extra: parseInt(blockStr.slice(pos2+1))
		}
	}
	
	if ((pos != -1) &&  (pos2 == -1)) {
	
		blockExtra = {
			block:	new BaseBlock(parseInt(blockStr.slice(0, pos2)), blockStr.slice(pos+1)),	
			extra: 1
		}		
	}
	
	if ((pos == -1) && (pos2 == -1)) {
		blockExtra = {
			block:	new BaseBlock(parseInt(blockStr), 0),	
			extra: 1
		}
	}
	
	if ((pos == -1) && (pos2 != -1)) {
	
		blockExtra = {
			block:	new BaseBlock(parseInt(blockStr.slice(0, pos2)), 0),	
			extra: parseInt(blockStr.slice(pos2+1))
		}		
	}
	
	return blockExtra;
	
}

function parseMode(modeStr) {

	var modeVal = -1;
	modeStr = String(modeStr).toLowerCase();
	
	for (inc in tools) {
		for (keyInc in tools[inc].keys) {
			if (modeStr ===  tools[inc].keys[keyInc]) {
				modeVal = inc;
			}
		}
	}
	return modeVal;
}

function getRandomXZVec() {

	var rngVec = new Vector;
	var rng = Math.random();

	switch (true) {
		case (rng > 0 && rng < .25):
			rngVec = Vector(1,0,0);
			break;
		case (rng >= .25 && rng < .5):
			rngVec = Vector(-1,0,0);
			break;
		case (rng >= .5 && rng < .75):
			rngVec = Vector(0,0,1);
			break;
		case (rng >= .75 && rng < 1):
			rngVec = Vector(0,0,-1);
			break;
	}

	return rngVec;

}

function getRandomXZSide(vec) {

	var rngVec = new Vector;
	var rng = Math.random();
	var rng2 = Math.random();
	
	if(vec.getX() == 0) {
		switch (true) {
			case (rng > 0 && rng < .5):
				rngVec = Vector(rng2,0,0);
				break
			case (rng >= .5 && rng <= 1):
				rngVec = Vector(-(rng2),0,0);
				break;
			
		}
	}
	else {
		switch (true) {
			case (rng > 0 && rng < .5):
				rngVec = Vector(0,0,-(rng2));
				break;
			case (rng >= .5 && rng <= 1):
				rngVec = Vector(0,0,rng2);
				break;

		}
	}

	return rngVec;
}

function getListBlock(list) {

	var tmpList = new Array();
	//var tmpObj = new Object();
	var maxBlock = 0;
	var maxChance = 0;
	var totalChance = 0;

	for (inc in list){
	
		var tmpObj = new Object();
		tmpObj.myBlock = list[inc].block;
		tmpObj.minChance = totalChance;
		tmpObj.maxChance = totalChance + list[inc].chance;
		tmpList.push(tmpObj);
		totalChance += list[inc].chance;
	}
	
	randomProb = Math.random() * totalChance;
	
	for (var inc = 0; inc < tmpList.length; inc++) {
		if ((randomProb >= tmpList[inc].minChance) && (randomProb <= tmpList[inc].maxChance)) {
			maxBlock = tmpList[inc].myBlock;
		}
	}

	var rng = Math.random();
	switch (true) {
	case (rng > 0 && rng < .25):
		maxBlock.rotate90();
		break;
	case (rng >= .25 && rng < .5):
		maxBlock.rotate90Reverse();
		break;
	case (rng >= .5 && rng < .75):
		maxBlock.flip();
		break;
	case (rng >= .75 && rng < 1):
		break;
	}

	return maxBlock;
	//var bType = new BaseBlock(oreList[maxOreID].BlockID);
	
}

function getDistance(a, b) {

var xSize = a.getX()-b.getX();
var ySize = a.getY()-b.getY();
var zSize = a.getZ()-b.getZ();
var distance = Math.sqrt((xSize*xSize)+(ySize*ySize)+(zSize*zSize));

return distance;
}

function getDistanceVec(a, b, length) {	
	//get the vector that is the specified distance away from vec a heading to vec b
	var i = length * (1 / getDistance(a, b));

	var xi = a.getX() + ((b.getX() - a.getX()) * i);
	var yi = a.getY() + ((b.getY() - a.getY()) * i);
	var zi = a.getZ() + ((b.getZ() - a.getZ()) * i);

	var v = new Vector( xi, yi, zi );
	return v;
}

function rotateVec(origin, vec, angle) {
	
	var s = Math.sin(angle * (Math.PI/180));
	var c = Math.cos(angle * (Math.PI/180));
	
	var dx = (vec.getX() - origin.getX()) * c - (vec.getZ() - origin.getZ()) * s;
	var dz = (vec.getX() - origin.getX()) * s + (vec.getZ() - origin.getZ()) * c;

	dx = Math.round(dx + origin.getX());
	dz = Math.round(dz + origin.getZ());
	
	return Vector(dx, vec.getY(), dz);
}

function getDirection() {		
	//returns object with multiple player direction properties
	
	var yaw = (player.getYaw()) % 360;
    if (yaw < 0) {
        yaw += 360;
	}
	
	var dir = new Array();
	dir.pitch = player.getPitch();
	dir.yaw = yaw;
	
	switch(true) {

		case ((yaw > 337.5) || (yaw <= 22.5)):
			dir.text = "South [Z+]";
			dir.vec = Vector(0,0,1);
			dir.angle = 0;
			dir.rightAngle = 0;
			break;	
		case ((yaw > 22.5) && (yaw <= 67.5)):
			dir.text = "South West [X- Z+]";
			dir.vec = Vector(-1,0,1);
			dir.angle = 45;
			dir.rightAngle = yaw < 45 ? 0 : 90;
			break;
		case ((yaw > 67.5) && (yaw <= 112.5)):
			dir.text = "West [X-]";
			dir.vec = Vector(-1,0,0);
			dir.angle = 90;
			dir.rightAngle = 90;
			break;
		case ((yaw > 112.5) && (yaw <= 157.5)):
			dir.text = "North West [X- Z-]";
			dir.vec = Vector(-1,0,-1);
			dir.angle = 135;
			dir.rightAngle = yaw < 135 ? 90 : 180;
			break;
		case ((yaw > 157.5) && (yaw <= 202.5)):
			dir.text = "North [Z-]";
			dir.vec = Vector(0,0,-1);
			dir.angle = 180;
			dir.rightAngle = 180;
			break;
		case ((yaw > 202.5) && (yaw <= 247.5)):
			dir.text = "North East [X+ Z-]";
			dir.vec = Vector(1,0,-1);
			dir.angle = 225;
			dir.rightAngle = yaw < 225 ? 180 : 270;
			break;
		case ((yaw > 247.5) && (yaw <= 292.5)):
			dir.text = "East [X+]";
			dir.vec = Vector(1,0,0);
			dir.angle = 270;
			dir.rightAngle = 270;
			break;
		case ((yaw > 292.5) && (yaw <= 337.5)):
			dir.text = "South West [X+ Z+]";
			dir.vec = Vector(1,0,1);
			dir.angle = 315;
			dir.rightAngle = yaw < 315 ? 270 : 0;
			break;
	}
	
	//player.print("Direction: " + dir.text + " [" + dir.yaw.toFixed(2) + "] [" + dir.pitch.toFixed(2) + "]" );
	return dir;

}

function getWorldEdit() {

	try {
		var spcSetup = JavaImporter(Packages.com.sijobe.spc.worldedit, Packages.com.sijobe.spc.wrapper);
		var we = spcSetup.WorldEditCommandSet.getCurrentInstance().WORLDEDIT;				// SPC single player mode
	}
	catch (e) {
		//Thanks to Nividica @ http://forum.sk89q.com/threads/i-need-to-script-schematics.8972/
		//for figuring out how to get worlddit plugin for bukkit
		var bucketSetup = JavaImporter(Packages.org.bukkit, Packages.org.bukkit.server, Packages.org.bukkit.plugin);
			var bukkitServer = bucketSetup.Bukkit.server;
			var bukkitPluginManager = bukkitServer.getPluginManager();
			var worldEditPlugin = bukkitPluginManager.getPlugin("WorldEdit");
			var we = worldEditPlugin.getWorldEdit();	
	}	
	finally {
		return we;
	}
}

function sendGameCommand(str) {
	if ($spc != false && typeof str != 'undefined') 
		com.sijobe.spc.wrapper.CommandManager.runCommand(com.sijobe.spc.wrapper.CommandSender($spc.player), str);
}

function getMinecraftWindow() {
	var windows = JFrame.getWindows()
	for (inc in windows)
		if (windows[inc].getTitle() == "Minecraft") var mc = (windows[inc]); 	
	return (mc ? mc : null);
}

function checkSPC() {

	try {
		var spcObj = {};
		spcObj.we = com.sijobe.spc.worldedit.WorldEditCommandSet.getCurrentInstance().WORLDEDIT;				// SPC single player mode
		spcObj.player = com.sijobe.spc.wrapper.MinecraftServer.getPlayerByUsername(player.getName());
		spcObj.playerMC = spcObj.player.getMinecraftPlayer();
		spcObj.world = spcObj.player.getWorld();
		spcObj.worldMC = spcObj.world.getMinecraftWorld();
		spcObj.server = com.sijobe.spc.wrapper.MinecraftServer.getMinecraftServer();
		
		return spcObj; 
	}
	catch (e) {;
		return false
	}
}

function checkFlag(flag, start) {

	if (start === undefined) {start = 2;}

	for (var fInc in argv) {
		if (fInc < start) {continue;}
		tmpStr = (String(argv[fInc]).slice(0, flag.length)).toLowerCase();
		if (tmpStr == String(flag).toLowerCase()) {
			var flagArg = String(argv[fInc]).slice(flag.length);
			if (flagArg.length > 0) {
				return flagArg;
			}
			else{
				return true;
			}
		}
	}
	return false;
}

function sleep(timeMs) {
	var futureTime = new Date().getTime() + timeMs;
	do { }
	while(new Date().getTime() < futureTime);
}

function compressArray(original) {
 
	var compressed = [];
	var copy = original.slice(0);
 
	for (var i = 0; i < original.length; i++) {
		var myCount = 0;
		for (var w = 0; w < copy.length; w++) {
			
			if (original[i] == copy[w]) {
				myCount++;
				delete copy[w];
			}
		}
 
		if (myCount > 0) {
			var a = new Object();
			a.value = Math.floor(original[i]);
			a.data = Math.round((original[i] - Math.floor(original[i])) * 100);	
			a.count = myCount;
			compressed.push(a);
		}
	}
 
	return compressed;
};

function getTarget() {

	//var es = context.getSession().createEditSession(player);

	if (checkFlag("~")) {
		var pos = player.getBlockTrace(parseInt(checkFlag("~")), true);
		if (pos == null) { return false; }
		else { 
			invert = pos.getY() <= player.getBlockIn().getY() ? 1 : -1;
			return {vec:  pos, block: getBlock(pos)} 
		}
	}
	else {
		pos = player.getBlockTrace(200);
		posB = player.getSolidBlockTrace(200);
		
		if (pos == null) { return false; }
		if (posB == null) { 
			invert = pos.getY() <= player.getBlockIn().getY() ? 1 : -1;
			return {vec:  pos, block: getBlock(pos)} 
		}
		
		if (String(pos) != String(posB)) {
			if (getBlock(pos).getType() > 7 && getBlock(pos).getType() < 12) {
				invert = posB.getY() <= player.getBlockIn().getY() ? 1 : -1;
				return {vec:  posB, block: getBlock(posB)} 
			}
		}
	}
	invert = pos.getY() <= player.getBlockIn().getY() ? 1 : -1;
	return {vec:  pos, block: getBlock(pos)} 		
}

function getFileList(fileDir, fileExt, fileName, printList) {

	if (printList == null) printList = true;
	if (fileDir == null) fileDir = "";
	if (fileExt == null) fileExt = "";
	if (fileName == null) fileName = "";
	
	var baseDir = String(context.getSafeFile("", String("worldedit.properties")));
	baseDir = String(baseDir.slice(0, baseDir.length-20));
	
	if (fileDir.length > 0) 
		baseDir = (baseDir + fileDir + "\\");
	var dirLen = baseDir.length;
	var file = File(baseDir);
	
	var fileList = file.listFiles();
	var extList = [];
	var fileStr = text.Gold + " #";
	var listInc = 0;
	for (listInc in fileList) {
		var fStr = (String(fileList[listInc]).slice(dirLen)).toLowerCase();
		if (fileExt.length  > 0 && fStr.slice(fStr.indexOf(".")+1) != (String(fileExt).toLowerCase()))
			continue;
		if (fileName.length > 0 && fStr.slice(0,fileName.length) != (String(fileName).toLowerCase()))
			continue;
			
		extList.push(fileList[listInc]);
		fileStr += (text.White + (fStr.indexOf(".") == -1 ? "\\" : "") + String(fileList[listInc]).slice(dirLen) + text.Gold + " #");
	}
	
	if(printList) {
		player.print(text.Gold + "Listing files in directory: \n" + text.White + baseDir + "\n");
		player.print(fileStr);
		player.print(text.Gold + extList.length + text.White + " total files found" + (fileExt.length > 0 ? (" with [*." + fileExt + "] ext.") : "."));
	}
	return extList;

}

function generateSurfaceImage(vecStart, vecEnd, colorByHeight, returnArray) {

	try {

		var start = {'x': Math.round(Math.min(vecStart.getX(), vecEnd.getX())), 'z': Math.round(Math.min(vecStart.getZ(), vecEnd.getZ())) };
		var end = {'x': Math.round(Math.max(vecStart.getX(), vecEnd.getX())), 'z': Math.round(Math.max(vecStart.getZ(), vecEnd.getZ())) };
		var mapWidth = end.x - start.x+1;
		var mapHeight = end.z - start.z+1;
			
		if (typeof returnArray == 'undefined' || returnArray == false) var img = new BufferedImage(mapWidth, mapHeight, BufferedImage.TYPE_INT_RGB);
		
		var lightDir = {
			'SEtoNW': Vector(1, 0, 1),
			'SWtoNE': Vector(-1, 0, 1),
			'NEtoSW': Vector(1, 0, -1),
			'NWtoSE': Vector(-1, 0, -1)
		}
		
		var colorArray = new Array();
		
		var lightAngle = 'NWtoSE';
		var invertLight = Vector(-1, 0, -1);
		var hoo = [8,9];
		
		var moda = .75;
		var modb = 1;
		var modc = -130;
		var modd = 4;
		var darkEdge = -.2;
		var lightEdge = .2;
		
		for (var x = 0; x < mapWidth; x++) {
			for (var z = 0; z < mapHeight; z++) {
				var pos = new Vector((start.x + x), 1, (start.z + z));
				//player.getWorld().checkLoadedChunk(pos);
				var yMax = session.getHighestTerrainBlock(pos.getX(),pos.getZ(), 0, 256, false);
				var topID = session.getBlock(Vector(pos.getX(), yMax, pos.getZ())).getType();
				var depth = 0;
				for (var y = yMax; y < 256; y++) {
					var topVec = Vector(pos.getX(), y, pos.getZ());
					var aboveBlock = session.getBlockType(topVec.add(0,1,0));
					if(aboveBlock == 0) {
						if (depth == 0) {
							var edgeL = session.getBlock(topVec.add(lightDir[lightAngle])).getType() == 0 ? true : false;
							var edgeD = session.getBlock(topVec.add(lightDir[lightAngle].multiply(invertLight))).getType() == 0 ? true : false;	// Check sideblock instead of the actual one... 
						}
						topID = session.getBlock(topVec.add(0,0,0)).getType();
						break;															
					}
					else if(hoo.indexOf(aboveBlock) != -1) {
						if (depth == 0) {
							var edgeL = hoo.indexOf(session.getBlock(topVec.add(lightDir[lightAngle].multiply(invertLight))).getType()) == -1  ? true : false;
							var edgeD = hoo.indexOf(session.getBlock(topVec.add(lightDir[lightAngle])).getType()) == -1 ? true : false;	// Check sideblock instead of the actual one... 
						}
						depth++
					}				
				}  	
				
				topID = topID == 35 ? '35:' + String(session.getBlock(topVec.add(0,0,0)).getData()) : topID;
				var clr = [255,0,0];
				var clrInc = blockColors[topID] != undefined ? topID : -1;
				
				if (clrInc != -1) {
				
					if (colorByHeight === false) {
						clr = buildColor(blockColors[clrInc][0]*moda, blockColors[clrInc][1]*moda, blockColors[clrInc][2]*moda);					
					}
					else {
						var r = blockColors[clrInc][0] + ((y + modc) / modb) - depth * modd; 
						var g = blockColors[clrInc][1] + ((y + modc) / modb) - depth * modd; 
						var b = blockColors[clrInc][2] + ((y + modc) / modb) - depth * modd;
						
						r = r + ((edgeD ? darkEdge * r : 0) + (edgeL ? lightEdge * (255 - r) : 0));
						g = g + ((edgeD ? darkEdge * g : 0) + (edgeL ? lightEdge * (255 - g) : 0));
						b = b + ((edgeD ? darkEdge * b : 0) + (edgeL ? lightEdge * (255 - b) : 0));
						
						r = Math.max(Math.min(r, 255), 0);
						g = Math.max(Math.min(g, 255), 0);
						b = Math.max(Math.min(b, 255), 0);
						
						clr = [r, g, b];
					}
				}
			
				var endClr = getColor(clr[0], clr[1], clr[2]) ;
				
				if (returnArray) {

					//colorArray[Math.round(pos.getX())] = colorArray[Math.round(pos.getX())] ? colorArray[Math.round(pos.getX())] : new Array();
					if (!colorArray[Math.round(pos.getX())])  colorArray[Math.round(pos.getX())] = new Array();
					if (vecStart.equals(vecEnd)) {
						//var tmpColor = getColor(clr.getRed(), clr.getGreen(), clr.getBlue());
						//if (tmpColor == null || typeof tmpColor == 'null') tmpColor == getColor(1,1,1);
						return endClr;
					}		
					colorArray[Math.round(pos.getX())][Math.round(pos.getZ())] = endClr;
					
				}
				else {	
					img.setRGB(x, z, endClr);
				}
			}
		}
		//printDebug("colorArray", colorArray);
		if (returnArray) {
			return colorArray;
		}
		else {
			return img;
		}
		
		//return (returnArray ? (vecStart == vecEnd ? vecColor : colorArray ): img);
	}
	catch(e) {
		printError("surfaceImage", e);
	}
	
}

function getColor(r, g, b) {

	return ((r << 16) | (g << 8) | b);

}

function colorDistance(c1, c2) {
	//All image functions are are from the provided draw script by sk89q
	// http://stackoverflow.com/questions/2103368/color-logic-algorithm/2103608#2103608
    var rmean = (c1.getRed() + c2.getRed()) / 2;
    var r = c1.getRed() - c2.getRed();
    var g = c1.getGreen() - c2.getGreen();
    var b = c1.getBlue() - c2.getBlue();
    var weightR = 2 + rmean/256;
    var weightG = 4.0;
    var weightB = 2 + (255-rmean)/256
    return Math.sqrt(weightR*r*r + weightG*g*g + weightB*b*b);
}

function findClosestWoolColor(col, clothColors) {
	
	var clothColors = [
		buildColor(254, 254, 254), // White - fixed so white gets picked over pink for white pixels
		buildColor(255, 100, 0), // Orange
		buildColor(200, 0, 200), // Magenta
		buildColor(87, 132, 223), // Light blue
		buildColor(255, 255, 0), // Yellow
		buildColor(0, 255, 0), // Green
		buildColor(255, 180, 200), // Pink
		buildColor(72, 72, 72), // Gray
		buildColor(173, 173, 173), // Light grey
		buildColor(0, 100, 160), // Cyan
		buildColor(120, 0, 200), // Purple
		buildColor(0, 0, 175), // Blue
		buildColor(100, 60, 0), // Brown
		buildColor(48, 80, 0), // Cactus green
		buildColor(255, 0, 0), // Red
		buildColor(0, 0, 0), // Black
	]
	
	var closestId = 0;
	var closestDistance = colorDistance(col, clothColors[0]);
	
	for(var i = 1; i < clothColors.length; i++) {
		var dist = colorDistance(col, clothColors[i]);
		
		if(dist < closestDistance) {
			closestId = i;
			closestDistance = dist;
		}
	}
	
	return closestId;
}

function BuildImage(vec) {
	// converted over from sk89q's draw script
	print("Test1");
	var f = context.getSafeFile("drawings", argv[2]);
	var upright = argv[3] == "v";
	var colors = clothColors;
	if(argv[4] == "opt") {
		colors = clothColorsOpt;
		player.print("Using optimized palette");
	} else if(argv[4] == "optHD") {
		colors = clothColorsOptHD;
		player.print("Using optimized HD palette");
	}
	if (!f.exists()) {
		player.printError("Specified file doesn't exist.");
	} else {
		var img = ImageIO.read(f);

		var width = img.getWidth();
		var height = img.getHeight();
		
		// return;
		var origin = vec;
		//print("Image Isze=" + img.size());
		for (var x = 0; x < 50/* width */; x++) {
			for (var y = 0; y < 50/* height */; y++) {
				var c = new Color(img.getRGB(x, y));
				var data = findClosestWoolColor(c,colors);
				// Added this to enable the user to create images upright
				// rather than flat on the ground
				if (!upright) {
					setBlock(origin.add(x, 0, y), new BaseBlock(35, data));
				}else {
					setBlock(origin.add(x, height - y, 0), new BaseBlock(35, data));
				}
			}
		}
	}

}

function openFileDialog() {
	try{
		UIManager.setLookAndFeel(UIManager.getSystemLookAndFeelClassName());  	
		var baseDir = String(context.getSafeFile("", String("worldedit.properties")));;
		var fc = new JFileChooser(baseDir);
		
		var filterKit = new FileNameExtensionFilter("Kit Files: (*.kit)", "kit");
		fc.setFileFilter(filterKit);
		var filterShape = new FileNameExtensionFilter("Shape Files: (*.shp; *.bo2; *.schematic)", "shp", "bo2", "schematic");
		fc.setFileFilter(filterShape);

		//var filter = new FileNameExtensionFilter( "JPG & GIF Images", "jpg", "gif");
		//fc.setFileFilter(filter);
		fc.setDialogTitle("Open Shape File");
		
		var returnVal = fc.showOpenDialog(null);
		if (returnVal == JFileChooser.APPROVE_OPTION)
			var filePath = fc.getSelectedFile();

	}
	catch(e) {
		print("FileDialog Error: " + e);
	}
	return filePath;
}

function setClearDay() {

	if (spcMode == false) return;
	var spcSetup = JavaImporter(Packages.com.sijobe.spc.worldedit, Packages.com.sijobe.spc.wrapper, Packages.com.sijobe.spc.command);
	var spcPlayer = spcSetup.MinecraftServer.getPlayerByUsername(player.getName());
	var worldBase = spcPlayer.getWorld().getMinecraftWorld();
	var world = spcSetup.World(worldBase);
	world.setTime(6000);
	world.setRaining(false);
	world.setThunder(false);
}

function saveGlobal(key, val) {
	var tmp = org.mozilla.javascript.Context.getCurrentContext().putThreadLocal(key, val);
	return (String(tmp) == 'null' ? null : tmp);
}

function loadGlobal(key) {
	var tmp = org.mozilla.javascript.Context.getCurrentContext().getThreadLocal(key);
	return (String(tmp) == 'null' ? false : tmp);
}

function removeGlobal(key) {
	var tmp = org.mozilla.javascript.Context.getCurrentContext().removeThreadLocal(key);
	return (String(tmp) == 'null' ? null : tmp);
}

function buildColor(r, g, b) { return new Color(r / 255, g / 255, b / 255); };

function getBlock(vec) { return session.getBlock(vec) };

function setBlock(vec, block) { return session.setBlock(vec, block) };

//////////////////////////////////////////////////////////
//				Print and String Functions (Need to clean up)
//////////////////////////////////////////////////////////

function ObjToStr(obj, str) {
	str = str ? str : obj;
	var tmp = "#####################  [ " + str + " ] End  ####################";
	//var inc = new Object();
	for (var inc in obj) {
		if (obj[inc]) {
			tmp = String(("### " + str + ".[" + inc + "] = {" + obj[inc] + "}\n") + tmp);	
		}
	}
	var tmp = "#####################  [ " + str + " ] Start  ####################\n" + tmp;
	return tmp;
}

function debug(str, val) { $debug.printRight(("### " + str + " = {" + (String(val) == 'null' || String(val) == 'undefined' ? String(val) : val) + "}"), Color.orange); };

function printDebug(str, val) {
	if ($debugMode) {
		debug("##DEBUG ECHO##" + str, val); 
		print(text.Red + "##DEBUG##" + text.Gold + " " + str + text.White + " = " + text.Gold + "{" + text.White + (String(val) == 'null' || String(val) == 'undefined' ? String(val) : val) + text.Gold + "}");
	}
}

function print(str) { return player.print(String(str) == 'null' || String(str) == 'undefined' ? String(str) : str) };

function repeatStr(str, cnt) {var tmpStr=""; for (var inc = 0; inc < cnt; inc++) { tmpStr += str }; return tmpStr; };

function printError(eloc, e) { 
	if (e.javaException) print(text.Red + eloc + " Java Error: " + text.Gold + "{ " + text.White + e.javaException + text.Gold + " }");
	if (e.rhinoException) print(text.Red + eloc + " Rhino Error: " + text.Gold + "{ " + text.White + e.rhinoException + text.Gold + " }");
	return;
}


//////////////////////////////////////////////////////////
//				Internal Creation Functions
//////////////////////////////////////////////////////////


function CreateLeafSphere(size, yLimit, density, hollow, vec, block, session) {
	//size, ylimit, density, hollow, vec, block, session
	if (size%2 == 0) {size++;}
	yLimit = yLimit > 0 ? size - yLimit: -(size - Math.abs(yLimit));
	
	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {
			
			var pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 +.5);
			var distance = getDistance(vec, pos);
			
			if (distance > size/2) {continue;}
			if ((hollow != 0) && (distance <= (size/2 - hollow))) {continue;}

			var diff = (size/2) - ((size/2) * density);
			var pctIn = (1-((distance-((size/2) * density))/diff));
	
			if ((pctIn < Math.random()) && (density != 1)) {continue;}
				
			var adjY = (pos.getY() - (vec.getY()-(size/2)));
			if ((adjY < yLimit) || (adjY > (size) + yLimit)) {continue;}
	
			if (yLimit < 0) {
				if (Math.abs(yLimit) > (size/2)) {
					pos = pos.add(0,Math.abs(yLimit)-(size/2)+1,0);
				}else {
					pos = pos.add(0,-(yLimit + (size/2))+1,0);
				}
			}
			if (yLimit > 0) {
				if (Math.abs(yLimit) > (size/2)) {
					pos = pos.add(0,-(yLimit-(size/2)),0);
				}else {
					pos = pos.add(0,((size/2) - yLimit),0);
				}
			}
			if (yLimit == 0) {
				pos = pos.add(0, (size/2)+1,0);
			}
			session.setBlock(pos.add(0,-.5,0), block);
			
			}
		}
	}

}

function CreateLeafClump(size, vec, block, session) {
	
	size = Math.round(size * .5);
	if (size%2 == 0) {size++;}
	
	var x = vec.getX();
	var y = vec.getY();
	var z = vec.getZ();
	
	if (invert == 1) {
		for(var k = y; k <= y + size; k++) {
			var l = k - y;
			var i1 = size - l;

			for(var j1 = x - i1; j1 <= x + i1; ++j1) {
				var k1 = j1 - x;

				for(var l1 = z - i1; l1 <= z + i1; ++l1) {
					var i2 = l1 - z;

					if(Math.abs(k1) != i1 || Math.abs(i2) != i1 || Math.random() >= 0.5) {
						var dest = new Vector(j1,k,l1);
						session.setBlock(dest, block);
					}
				}
			}
		}
	}
	if (invert == -1) {
		for(var k = y; k >= y - size; k--) {
			var l = k - y;
			var i1 = size - l;

			for(var j1 = x - i1; j1 <= x + i1; ++j1) {
				var k1 = j1 - x;

				for(var l1 = z - i1; l1 <= z + i1; ++l1) {
					var i2 = l1 - z;

					if(Math.abs(k1) != i1 || Math.abs(i2) != i1 || Math.random() >= 0.5) {
						var dest = new Vector(j1,k,l1);
						session.setBlock(dest, block);
					}
				}
			}
		}
	}
}

function CreateTrunk(size, height, vec, block, session) {
	var baseSize = size;
	for(var y = 0; y < height; y++) {
		baseSize = size - (size*(y/height))+.5;
		//if (baseSize%2 == 0) {baseSize++;}
		CreateLeafSphere(baseSize+y/8, 2*invert, 1, 0, vec.add(0,y*invert,0), block, session);
	}
	
}

function CreateShape(shapeObj, startOrigin, angle, blockMat, excludeID, invertVal) {
	
	var shape = shapeObj.shape;
	var afterBlocks = [];
	var minVec = zVec;
	
	//blacklist are all 'attached' block dependent items that need to be set after everything else
	var blackList = [6,26,27,28,31,37,38,39,40,50,51,54,55,59,63,64,65,66,68,69,70,71,72,75,76,77,78,81,83,93,94,96,104,105,106,111,115,127,131,132,141,142,143];
	var flipList = [44,53,67,108,109,114,126,128,134,135,136];
	
	if (shapeObj.src == "schematic") 
		var origin = startOrigin;
	else {
		origin = startOrigin.add(shapeObj.offset);
	}
		
	for (inc in shape){

		var endAngle = (parseInt(angle) + parseInt(shapeObj.angle)) % 360;
		
		if((shapeObj.angle == 0) || (shapeObj.angle == 180)) {
			endAngle = (endAngle + 180) % 360;
		}
		if (blockMat.next(0,0,0).getType() < 1) {
			var block = parseBlock(shape[inc].id);
		}
		else {
			var block = blockMat.next(0,0,0);
			block = parseBlock(shape[inc].id).getType() == 0 ? parseBlock(shape[inc].id) : block;
		}
		if (block.getType() == excludeID) {continue;}

		switch (endAngle) {
			case 0:	
				if (shapeObj.src == "schematic") {
					vec = origin.add(shape[inc].vec.getZ(),shape[inc].vec.getY()*invertVal,-shape[inc].vec.getX());
					vec = vec.add(-shapeObj.offset.getZ(),1*invertVal,-1);
					block.rotate90Reverse();
				}
				else {
					vec = origin.add(-shape[inc].vec.getZ(),shape[inc].vec.getY()*invertVal,shape[inc].vec.getX());
					block.rotate90();
				}
				
				break;
			case 90:
				if (shapeObj.src == "schematic") {
					vec = origin.add(shape[inc].vec.getX(),shape[inc].vec.getY()*invertVal,shape[inc].vec.getZ());
					vec = vec.add(1,1*invertVal, -shapeObj.offset.getZ());
				}		
				else {
					vec = origin.add(-shape[inc].vec.getX(),shape[inc].vec.getY()*invertVal,-shape[inc].vec.getZ());
					block.flip();
				}
				break;
			case 180:
				if (shapeObj.src == "schematic") {
					vec = origin.add(-shape[inc].vec.getZ(),shape[inc].vec.getY()*invertVal,shape[inc].vec.getX());
					vec = vec.add(shapeObj.offset.getZ(),1*invertVal,1);
					block.rotate90();
				}
				else{
					vec = origin.add(shape[inc].vec.getZ(),shape[inc].vec.getY()*invertVal,-shape[inc].vec.getX());
					block.rotate90Reverse();
				}
				break;
			case 270:
				if (shapeObj.src == "schematic") {
					vec = origin.add(-shape[inc].vec.getX(),shape[inc].vec.getY()*invertVal,-shape[inc].vec.getZ());
					vec = vec.add(-1,1*invertVal, shapeObj.offset.getZ());
					block.flip();
				}
				else {
					vec = origin.add(shape[inc].vec.getX(),shape[inc].vec.getY()*invertVal,shape[inc].vec.getZ());
				}
				break;	
			default:
				if (shapeObj.src == "schematic") {
					vec = origin.add(-shape[inc].vec.getX(),shape[inc].vec.getY()*invertVal,-shape[inc].vec.getZ());
					vec = vec.add(-1,1*invertVal, shapeObj.offset.getZ());
					vec = rotateVec(origin, vec, (angle-shapeObj.angle+270)%360);
				}
				else {
					vec = origin.add(shape[inc].vec.getX(),shape[inc].vec.getY()*invertVal,shape[inc].vec.getZ());
					vec = rotateVec(origin, vec, (angle-shapeObj.angle+270)%360);
				}
				break;
		}
		if(minVec == zVec) {minVec = vec;}
		
		if (invertVal == -1) {
			if (flipList.indexOf(block.getType()) != -1) {
				block.flip(CuboidClipboard.FlipDirection.UP_DOWN);
			}	
		}	
		
		if (vec != origin) {
			if (blackList.indexOf(block.getType()) != -1) {
				var tmpObj = new Object();
				tmpObj.vec = vec;
				tmpObj.block = block;
			
				afterBlocks.push(tmpObj);
			}
			else {
				setBlock(vec, block);
			}
		}
    }

	for (lateInc in afterBlocks){
		setBlock(afterBlocks[lateInc].vec, afterBlocks[lateInc].block);
	}
	
	if (checkFlag("$")) {
		var selector = localSession.getRegionSelector(player.getWorld());
		if (selector.selectPrimary(minVec)) {
			localSession.dispatchCUISelection(player);
		}
		if (selector.selectSecondary(vec)) {
			localSession.dispatchCUISelection(player);
		}
	}

}

function CreateLine(a, b, block, session) {

	var distance = getDistance(a, b);
	var step = .9/distance;

	for( var i = 0; i <= 1; i += step) {
			
		var xi = a.getX() + ((b.getX() - a.getX()) * i);
		var yi = a.getY() + ((b.getY() - a.getY()) * i);
		var zi = a.getZ() + ((b.getZ() - a.getZ()) * i);
		
		var vec = new Vector(xi, yi, zi);
		session.setBlock(vec, block);	
	}
}

function CreateSpike(origin, end, block, session, size) { 

	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {
			
				pos = origin.add(x - size/2, y - size/2, z - size/2);
				distance = getDistance(origin, pos);

				if (distance > size/2) {continue;}
				CreateLine(pos, end, block, session);
			}
		}
	}

}

function CreateSphere(size, hollow, vec, block) {
	//hollow = the number of blocks thicks the "shell" should be, use 0 for solid
	
	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {
			
				pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
				distance = getDistance(vec, pos);
				
				if (distance > size/2) {continue;}
				if ((hollow != 0) && (distance <= (size/2 - hollow))) {continue;}

				session.setBlock(pos, block);
			
			}
		}
	}

}

function CreateRandom(vec, rngType, block, replaceBlock, maxCnt, xStretch, yStretch, zStretch ) {

	if (vec == null)	return
	try {
		var startTime = new Date();

		var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;

		var offsetList = [];
		offsetList[0] = Vector(0,1,0);
		offsetList.push(Vector(0,-1,0))
		offsetList.push(Vector(1,0,0))
		offsetList.push(Vector(-1,0,0))
		offsetList.push(Vector(0,0,1))
		offsetList.push(Vector(0,0,-1))
		
		if (xStretch > 1) {
			for (var xinc = 2; xinc < xStretch+1; xinc++) {
				offsetList.push(Vector(xinc,0,0));
				offsetList.push(Vector(-xinc,0,0));
			}
		}
		if (yStretch > 1) {
			for (var yinc = 2; yinc < yStretch+1; yinc++) {
				offsetList.push(Vector(0,yinc,0));
				offsetList.push(Vector(0,-yinc,0));
			}
		}
		if (zStretch > 1) {
			for (var zinc = 2; zinc < zStretch+1; zinc++) {
				offsetList.push(Vector(0,0,zinc));
				offsetList.push(Vector(0,0,-zinc));
			}
		}
		
		//var tryMax = 500000;
		var tryMax = maxCnt * 25
		
		vec = vec.add(0,invert,0)
		//var replaceBlock = new BaseBlock(0,0);

		var expandList = [];
		expandList.push(vec);
		session.setBlock(vec, mat);
		
		var tryCnt = 0;
		var setCnt = 1;
		
		
		switch(rngType)	 {
			case 1:							// ### Cross hatch type, fills in all sideblocks in offsetlist
				while (setCnt < maxCnt) {
					
					var rngSpot = Math.floor(Math.random() * (expandList.length));
					var rngSide = Math.floor(Math.random() * (offsetList.length));

					for (var side in offsetList) {
							
						if (replaceBlock == null) {
							
							if (session.rawGetBlock(expandList[rngSpot].add(offsetList[side])).getType() != mat.next(zVec).getType()) {
								expandList.push(expandList[rngSpot].add(offsetList[side]));
								setBlock(expandList[rngSpot].add(offsetList[side]), mat);
								setCnt++;
								if (setCnt >= maxCnt) break;
							}
						}
						else {
							if (session.rawGetBlock(expandList[rngSpot].add(offsetList[side])).getType() == replaceBlock.getType()) {
								expandList.push(expandList[rngSpot].add(offsetList[side]));
								setBlock(expandList[rngSpot].add(offsetList[side]), mat);
								setCnt++;
								if (setCnt >= maxCnt) break;
							}
						}
					}
					
					if (replaceBlock == null) {
						if (session.rawGetBlock(expandList[rngSpot]).getType() != mat.next(zVec).getType()) {
							setBlock(expandList[rngSpot], mat);
							setCnt++;
						}
					}					
					else if(session.rawGetBlock(expandList[rngSpot]).getType() == replaceBlock.getType()) {
						setBlock(expandList[rngSpot], mat);
						setCnt++;
					}
					
					if (tryCnt >= tryMax) {
						//player.print(text.Red + "Error: " + text.White + "Max tries limit of " + text.Gold + tryMax + text.White + " hit!");					
						break;
					}
					if (tryCnt > 200 && expandList.length < 2) {
						//player.print("Out of room");
						break;
					}
					tryCnt++;
				}
				var totalTime = (new Date() - startTime)/1000;
				//player.print(session.getBlockChangeCount());
				//player.print(text.Gold + "Blocks: " + text.White +  setCnt + text.Gold + " | Time: " + text.White + totalTime + text.Gold + " | BPS: " + text.White + Math.floor(1/totalTime*setCnt));
				return true;	
			
			case 2:								// ### Regular random side, fills in only 1 sideblock in the offsetlist per try
				while (setCnt < maxCnt) {
					
					var rngSpot = Math.floor(Math.random() * (expandList.length));
					var rngSide = Math.floor(Math.random() * (offsetList.length));

					for (var side in offsetList) {
						if (replaceBlock == null) {
							
							if (session.rawGetBlock(expandList[rngSpot].add(offsetList[side])).getType() != mat.next(zVec).getType()) {
								expandList.push(expandList[rngSpot].add(offsetList[side]));
							}
						}
						else {
							if (session.rawGetBlock(expandList[rngSpot].add(offsetList[side])).getType() == replaceBlock.getType()) {
								expandList.push(expandList[rngSpot].add(offsetList[side]));
								//session.setBlock(expandList[rngSpot].add(offsetList[side]), mat);
								//setCnt++;
							}
						}
					}
					
					if (replaceBlock == null) {
						if (session.rawGetBlock(expandList[rngSpot]).getType() != mat.next(zVec).getType()) {
							setBlock(expandList[rngSpot], mat);
							setCnt++;
							tryCnt--;
						}
					}	
					else if (session.rawGetBlock(expandList[rngSpot]).getType() == replaceBlock.getType()) {
						setBlock(expandList[rngSpot], mat);
						setCnt++;
						tryCnt--;
					}
					
					if (tryCnt >= tryMax) {
						//player.print(text.Red + "Error: " + text.White + "Max tries limit of " + text.Gold + tryMax + text.White + " hit!");					
						break;
					}
					if (tryCnt > 200 && expandList.length < 2) {
						//player.print("Out of room");
						break;
					}
					tryCnt++;
				}
				var totalTime = (new Date() - startTime)/1000;
				//player.print(session.getBlockChangeCount());
				//player.print(text.Gold + "Blocks: " + text.White +  setCnt + text.Gold + " | Time: " + text.White + totalTime + text.Gold + " | BPS: " + text.White + Math.floor(1/totalTime*setCnt));
				return true;
				
			case 3:								// ### Random string mode, find and set 1 position per turn, remove all old locations
				var rngSpot;
				//var rngSide;
				var rngVec = vec.add(0,0,0);
				var oldvec = rngVec;
				while (setCnt < maxCnt) {

					//rngSpot = Math.floor(Math.random() * (expandList.length));
					//var rngSide = Math.floor(Math.random() * (offsetList.length));

					var rngSide = Math.floor(Math.random() * (offsetList.length));
					var rngSide2 = Math.floor(Math.random() * (offsetList.length));
					oldVec = rngVec;
					rngVec  = rngVec.add(offsetList[rngSide])//.add(offsetList[rngSide2]);
					
					if (replaceBlock == null) {
						if (session.rawGetBlock(rngVec).getType() != mat.next(zVec).getType()) {
							setBlock(rngVec, mat);
							setCnt++;
							if (setCnt >= maxCnt) break;
						}
					}
					else {
						if (session.rawGetBlock(rngVec).getType() == replaceBlock.getType()) {
							//CreateLine(oldVec, rngVec, mat, session);
							setBlock(rngVec, mat);
							setCnt++;
							if (setCnt >= maxCnt) break;
						}
					}
					//tryCnt--;
					//session.setBlock(expandList[rngSpot].add(offsetList[side]), mat);
					//setCnt++;


					if (tryCnt >= tryMax) {
						//player.print(text.Red + "Error: " + text.White + "Max tries limit of " + text.Gold + tryMax + text.White + " hit!");					
						break;
					}
					tryCnt++;
				}
				var totalTime = (new Date() - startTime)/1000;
				//player.print(session.getBlockChangeCount());
				//player.print(text.Gold + "Blocks: " + text.White +  setCnt + text.Gold + " | Time: " + text.White + totalTime + text.Gold + " | BPS: " + text.White + Math.floor(1/totalTime*setCnt));
				return true;				
		}
	}
	catch (e) {
		printError("CreateRandom", e);
	}
}


//////////////////////////////////////////////////////////
//				Tree Creation Functions
//////////////////////////////////////////////////////////


function CreateBush(vec, session, size, woodBlock, leafBlock) {
	
	if (checkFlag("c", 3))
		CreateLeafClump(size, vec.add(0,1*invert,0), leafBlock, session);
	else	
		CreateLeafSphere(size, 2*invert, .95, 0, vec.add(0,1*invert,0), leafBlock, session);
	
	session.setBlock(vec.add(0,1*invert,0), woodBlock);
}

function CreateSmallTree(vec, session, size, woodBlock, leafBlock) {

	for (var y = 1; y <= size; y++)	 {
		session.setBlock(vec.add(0,y*invert,0), woodBlock);
	}
	
	if (checkFlag("c", 3))
		CreateLeafClump(size*.7, vec.add(0,y*invert,0), leafBlock, session);
	else	
		CreateLeafSphere(size, 3*invert+(size*.1) , .9, 0, vec.add(0,y*invert,0), leafBlock, session);

	
}

function CreateStickTree(vec, session, size, woodBlock, leafBlock) {

	for (var y = 1; y <= size; y++)	 {
		if (y < size/2)	
			session.setBlock(vec.add(0,y*invert,0), woodBlock);
		else
			session.setBlock(vec.add(0,y*invert,0), leafBlock);
	}

}

function CreateMediumTree(vec, session, size, woodBlock, leafBlock) {
	
	var newPnt = vec;
	for (var y = 1; y <= size; y++)	 {
		
		var randDir = getRandomXZVec();
		var sideDir = getRandomXZSide(randDir);
		var branchLength = (size*trees['medium'].branchSize) + (Math.random()*(size*trees['medium'].branchSize));

		for(branch = 1; branch < branchLength; branch++) {
				newPnt = vec.add(randDir.getX()*branch, (y*invert)+(branch/2*invert), randDir.getZ()*branch);
				newPnt = newPnt.add(sideDir.getX()*(branch/2), 0, sideDir.getZ()*(branch/2));
				session.setBlock(newPnt, woodBlock);
		}
		session.setBlock(newPnt.add(0,1*invert,0), woodBlock);
		
		if (checkFlag("c", 3))
			CreateLeafClump(trees['medium'].leafSize/2+1, newPnt.add(0,2*invert,0), leafBlock, session);
		else
			CreateLeafSphere(trees['medium'].leafSize, 3*invert, .9, 0, newPnt.add(0,2*invert,0), leafBlock, session);

		session.setBlock(vec.add(0,y*invert,0), woodBlock);
	}
	if (checkFlag("c", 3))
		CreateLeafClump(6, vec.add(0,y*invert,0), leafBlock, session);
	else
		CreateLeafSphere(8, 4*invert, .8, 0, vec.add(0,y*invert,0), leafBlock, session);
}

function CreateLargeTree(vec, session, size, woodBlock, leafBlock) {
	
	var newPnt = vec;
	for (var y = 1; y <= size; y++)	 {
		
		if(Math.random() >= (1 - trees['large'].branchProb)) {
		
			var randDir = getRandomXZVec();
			var sideDir = getRandomXZSide(randDir);
			var branchLength = (size*trees['large'].branchSize) + (Math.random()*(size*trees['large'].branchSize));
			
			for(branch = 1; branch < branchLength; branch++) {
					newPnt = vec.add(randDir.getX()*branch, (y*invert)+(branch/2*invert), randDir.getZ()*branch);
					newPnt = newPnt.add(sideDir.getX()*(branch/2), 0, sideDir.getZ()*(branch/2));
					session.setBlock(newPnt, woodBlock);
			}
			if (branch == branchLength-1)
				session.setBlock(newPnt.add(0,1*invert,0), woodBlock);
			if (checkFlag("c", 3))
				CreateLeafClump(trees['large'].leafSize/2+1, newPnt.add(0,2*invert,0), leafBlock, session);
			else
				CreateLeafSphere(trees['large'].leafSize, 3*invert, .9, 0, newPnt.add(0,2*invert,0), leafBlock, session);
				
		}
		
		session.setBlock(vec.add(0,y*invert,0), woodBlock);
	}
	
	CreateTrunk(size*.2, size * .3, vec.add(.5, 0, .5), woodBlock, session);
	
	if (checkFlag("c", 3))
		CreateLeafClump(6, vec.add(0,y*invert,0), leafBlock, session);
	else	
		CreateLeafSphere(8, 4*invert, .8, 0, vec.add(0,y*invert,0), leafBlock, session);
}

function CreateBranchedTree(vec, session, size, woodBlock, leafBlock) {
	
	var newPnt = vec;
	for (var y = 1; y <= size; y++)	 {
	
		if(Math.random() >= (1 - trees['branched'].branchProb1)) {
			
			var randDir1 = getRandomXZVec();
			var sideDir1 = getRandomXZSide(randDir1);
			var branchLength1 = (size*trees['branched'].branchSize1) + (Math.random()*(size*trees['branched'].branchSize1));
			
			for(branch1 = 1; branch1 < branchLength1; branch1++) {
				newPnt = vec.add(randDir1.getX()*branch1, (y*invert)+(branch1/2*invert), randDir1.getZ()*branch1);
				newPnt = newPnt.add(sideDir1.getX()*(branch1), 0, sideDir1.getZ()*(branch1));
				session.setBlock(newPnt, woodBlock);
				
				if(Math.random() >= (1 - trees['branched'].branchProb2)) {

					var randDir2 = getRandomXZVec();
					var sideDir2 = getRandomXZSide(randDir2);
					var branchLength2 = (size*trees['branched'].branchSize2) + (Math.random()*(size*trees['branched'].branchSize2));
					
					for(branch2 = 1; branch2 < branchLength2; branch2++) {
						//var newPnt = vec.add(randDir.getX()*branc1h, (y*invert)+(branch2/2*invert)), randDir.getZ()*branch1);
						var newPnt2 = newPnt.add(sideDir2.getX()*(branch2/2), 1*invert, sideDir2.getZ()*(branch2/2));
						session.setBlock(newPnt2, woodBlock);
						
					}
					session.setBlock(newPnt2.add(0,1*invert,0), woodBlock);
					if (checkFlag("c", 3))
						CreateLeafClump(trees['branched'].leafSize/2-1, newPnt2.add(0,2*invert,0), leafBlock, session);
					else	
						CreateLeafSphere(trees['branched'].leafSize, 2*invert, .9, 0, newPnt2.add(0,2*invert,0), leafBlock, session);
				}
			}
			
			session.setBlock(newPnt.add(0,1*invert,0), woodBlock);
			
			if (checkFlag("c", 3))
				CreateLeafClump(trees['branched'].leafSize/2-1, newPnt.add(0,2*invert,0), leafBlock, session);
			else
				CreateLeafSphere(trees['branched'].leafSize, 3*invert, .9, 0, newPnt.add(0,2*invert,0), leafBlock, session);
				
		}
		
		session.setBlock(vec.add(0,y*invert,0), woodBlock);
	}
	
	CreateTrunk(size*.3, size * .35, vec, woodBlock, session);
	if (checkFlag("c", 3))
		CreateLeafClump(6, vec.add(0,y*invert,0), leafBlock, session);
	else	
		CreateLeafSphere(8, 4*invert, .8, 0, vec.add(0,y*invert,0), leafBlock, session);
}

function CreateRainforestTree(vec, session, size, woodBlock, leafBlock) {
	var newPnt = vec;
	for (var y = 1; y <= size; y++)	 {
		
		if (y > (trees['rainforest'].branchHeight * size)) {
			var randDir = getRandomXZVec();
			var sideDir = getRandomXZSide(randDir);
			var branchLength = (size*trees['rainforest'].branchSize) + (Math.random()*(size*trees['rainforest'].branchSize));
			
			if(Math.random() >= (1 - trees['rainforest'].branchProb)) {
		
				for(branch = 1; branch < branchLength; branch++) {
					newPnt = vec.add(randDir.getX()*branch, (y*invert)+(branch/2*invert), randDir.getZ()*branch);
					newPnt = newPnt.add(sideDir.getX()*(branch/2), 0, sideDir.getZ()*(branch/2));
					session.setBlock(newPnt, woodBlock);
				}
				if (checkFlag("c", 3))
					CreateLeafClump(trees['rainforest'].leafSize/2, newPnt.add(0,1*invert,0), leafBlock, session);
				else
					CreateLeafSphere(trees['rainforest'].leafSize, 2*invert, .95, 0,  newPnt.add(0,1*invert,0), leafBlock, session);
			}
		}			
		session.setBlock(vec.add(0,y*invert,0), woodBlock);
	}
	
	CreateTrunk(size*.15, size * .2, vec.add(.5, 0, .5), woodBlock, session);
	
	if (checkFlag("c", 3))
		CreateLeafClump(trees['rainforest'].leafSize/2, vec.add(0,y*invert,0), leafBlock, session);
	else
		CreateLeafSphere(trees['rainforest'].leafSize, 3*invert, .9, 0,  vec.add(0,y*invert,0), leafBlock, session);

}

function CreatePalmTree(vec, session, size, woodBlock, leafBlock) {

	var randDir = getRandomXZVec();
	var sideDir = getRandomXZSide(randDir);
	
	for (var y = 0; y < size; y++)	 {
		var setVec = vec.add(randDir.getX()*y*.5, (y+1)*invert, randDir.getZ()*y*.5);
		var setVec = setVec.add(sideDir.getX()*y*.5, 0, sideDir.getZ()*y*.5);
		
		session.setBlock(setVec, woodBlock);
		//session.setBlock(setVec.add(0,-invert,0), woodBlock);
	}
	for (var ang = 0; ang < 360; ang+= 90) {
		CreateShape(shapes['PalmLeaf'], setVec, ang, checkFlag("l") ? new SingleBlockPattern(parseBlock(checkFlag("l"))) : airMat, -1, -invert);
	}
	session.setBlock(setVec, woodBlock);
}

function CreateSpikeTree(vec, session, size, woodBlock, leafBlock) {

	//var size = checkFlag("s") ? parseInt(checkFlag("s"))* (1+Math.random()*.2) : (Math.random() * (trees['spike'].maxChg)) + trees['spike'].minSize;
	//var woodBlock = checkFlag("w") ? parseBlock(checkFlag("w")) : trees['spike'].woodBlock;
	//var leafBlock = checkFlag("l") ? parseBlock(checkFlag("l")) : trees['spike'].leafBlock;
	//size = gSize != -1 ? gSize + (gSize * (1+Math.random()*.2)) : size;
	var newPnt = vec;
	for (var y = 1; y <= size; y++)	 {
		
		if (y < size *.6) continue;
		if(Math.random() >= (1 - trees['spike'].branchProb1)) {
		
			var randDir1 = getRandomXZVec();
			var sideDir1 = getRandomXZSide(randDir1);
			var branchLength1 = (size*trees['spike'].branchSize1) + (Math.random()*(size*trees['spike'].branchSize1));
			
			//var maxRange = (Math.random() * 5)+.5;
			
			for(branch1 = 1; branch1 < branchLength1; branch1++) {
				newPnt = vec.add(randDir1.getX()*branch1, y+(branch1/2), randDir1.getZ()*branch1);
				newPnt = newPnt.add(sideDir1.getX()*(branch1), 0, sideDir1.getZ()*(branch1));
				session.setBlock(newPnt, woodBlock);

				if(Math.random() >= (1 - trees['spike'].branchProb2)) {

					var randDir2 = getRandomXZVec();
					var sideDir2 = getRandomXZSide(randDir2);
					var branchLength2 = (size*trees['spike'].branchSize2) + (Math.random()*(size*trees['spike'].branchSize2));
					
					for(branch2 = 1; branch2 < branchLength2; branch2++) {
						//var newPnt = vec.add(randDir.getX()*branc1h, y+(branch/2), randDir.getZ()*branch1);
						var newPnt2 = newPnt.add(sideDir2.getX()*(branch2/2), 0, sideDir2.getZ()*(branch2/2));
						session.setBlock(newPnt2, woodBlock);
						
					}
					//CreateSpike(newPnt, newPnt2, trees['spike'].woodBlock, session, 2);
					
					session.setBlock(newPnt2.add(0,1,0), woodBlock);
					if (checkFlag("c", 3))
						CreateLeafClump(trees['spike'].leafSize/2-1, newPnt2.add(0,2*invert,0), leafBlock, session);
					else	
						CreateLeafSphere(trees['spike'].leafSize, 2*invert, .9, 0, newPnt2.add(0,2*invert,0), leafBlock, session);
				}
			}
			
			CreateSpike(vec.add(0,y,0), newPnt, woodBlock, session, 3);
			if (checkFlag("c", 3))
				CreateLeafClump(trees['spike'].leafSize/2-1, newPnt.add(0,2*invert,0), leafBlock, session);
			else
				CreateLeafSphere(trees['spike'].leafSize, 3*invert, .9, 0, newPnt.add(0,2*invert,0), leafBlock, session);
		}
	}
	CreateSpike(vec, vec.add(0,size*1.3,0), trees['spike'].woodBlock, session, size/9);
	
	if (checkFlag("c", 3))
		CreateLeafClump(6, vec.add(0,y*invert,0), leafBlock, session);
	else	
		CreateLeafSphere(8, 4*invert, .8, 0, vec.add(0,y*invert,0), leafBlock, session);

}

function CreateMushroom(vec, session, size, woodBlock, leafBlock) {

	leafBlock = (gMat == airMat) ? new SingleBlockPattern(leafBlock) : gMat;

	var randDir = getRandomXZVec();
	var sideDir = getRandomXZSide(randDir);
	var setVec = vec;
	var newVec = vec;;
	//var slopeMod = .3;
	
	for (var y = 0; y < size *.6; y++)	 {
		
		var slopeMod = 1-(y/(size*1.1));
		setVec = vec.add(randDir.getX()*y*slopeMod, (y+1)*invert, randDir.getZ()*y*slopeMod);
		setVec = setVec.add(sideDir.getX()*y*slopeMod, 0, sideDir.getZ()*y*slopeMod);
		
		CreateLeafSphere(size/3, 2 , .98, 0, setVec, woodBlock, session)
	}
	var slopeMod = 0;
	
	for (var y = 0; y < size * .4; y++)	 {
		
		//var slopeMod = 1-(y/size);
		newVec = setVec.add(randDir.getX()*y*slopeMod/2, (y+1)*invert, randDir.getZ()*y*slopeMod/2);
		newVec = newVec.add(sideDir.getX()*y*slopeMod/2, 0, sideDir.getZ()*y*slopeMod/2);
		//var newVec = setVec.add(0, (y+1)*invert, 0);
		CreateLeafSphere(size/3, 2 , .98, 0, newVec, woodBlock, session)
	}
	
	CreateLeafSphere(size, (size/2)*invert, 1, (size/8), newVec.add(0,-(size/2-size/8)*invert+1,0), leafBlock, session)
}


//////////////////////////////////////////////////////////
//				Player Tool Commands
//////////////////////////////////////////////////////////


function HelpText(cmdType)  {
	this.name =  "Help";	
	this.note =  "General, or command specific info.";
	this.keys = ["help", "h", "?"];
	this.args = {
		0 : { 
			name: "command", 
			note: "The command keyword to look up.",
			flag: "",
			type: "string", 
			defArg: null
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) {
		if (cmdType != 1) {
			var helpArg = argv.length > 2 ? argv[2] : -1;
			var helpMode = parseMode(helpArg)
			localSession.setTool(player.getItemInHand(), null);
		}
		else{
			var helpArg = argv.length > 1 ? argv[1] : 1;
			var helpMode = parseMode(helpArg)
		}	
		
		if (helpMode != -1) {
			
			var keyStr = [];	
			var argStr = [];
			
			for (var keyInc in tools[helpMode].keys) {
				keyStr = keyStr + text.Red + tools[helpMode].keys[keyInc] + text.White + "|";
			}
			for (var argInc in tools[helpMode].args) {
				argStr = argStr + (text.White + "<");
				if (String(tools[helpMode].aFlags[argInc]).length > 0) {
					argStr = argStr + (text.Red + tools[helpMode].aFlags[argInc] + text.Gold + text.Arrow);
				}
				argStr = argStr + (text.Red + tools[helpMode].args[argInc] + text.White + ">");
			}

			player.print(" ");
			player.print(text.Gold + tools[helpMode].name + " " + text.Gold + argStr);
			player.print(text.White + text.Italics + tools[helpMode].note);
			player.print(text.White + "Keywords  |" + text.Red + keyStr );
		}
		else {
			player.print("\n" + text.Gold + text.Italics + "Build Commands " + text.Red + "v" + version + text.White + " by inHaze \n \n");
			player.print(text.White + "Type " + text.Red + "/cs build list"  + text.White + " or " + text.Red + "/cs build commands" + text.White + " for command usage.");
			player.print(text.White + "Type " + text.Red + "/cs build ? " + text.Gold + "command" + text.White + " for detailed info on any command.");
			mode = 1;
		}
	}
	else {
		
		bType = BlockType.fromID(getTarget().block.getType());
		//helpBlock = getTarget().getBlock
		helpStr = (text.Gold + "Block: " + text.White + getTarget().block.getType() + ":" + getTarget().block.getData() + text.Gold + " | " + text.White + (bType == null ? "Unknown" : bType.getName()));
		helpStr += (text.Gold + " | " + text.White + getTarget().vec + text.Gold + " | Distance: " + text.White + getDistance(getTarget().vec, player.getBlockIn()).toFixed(1));
		player.print(helpStr);
		return;
	}
	
	return true;
}

function CommandListShort() {
	this.name =  "Command List(Short)";	
	this.note = "List commands - Short";
	this.keys = ["list", "shortlist"];
	this.args = null;
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;	if (vecList.length > 0) {  return false }
	
	var names = [];
	var listStr = text.White + "[";
	
	for (inc in tools) {
		names.push (String(tools[inc].keys[0]))
	}
	names.sort();
	for (inc in names) {
		listStr = listStr + (text.Gold + names[inc] + text.White + " | ");
	}
	
	listStr = listStr + "]";
	player.print("\n" + text.White + "Short Command List - Use " + text.Red + "/cs build commands" + text.White + " for a full listing \n \n");
	player.print(listStr);
	mode = 2;
	return true;
}

function CommandListLong() {
	this.name =  "Command List(Long)";	
	this.note = "List commands - Long";
	this.keys = ["commands", "command", "longlist"];
	this.args = null;
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;	if (vecList.length > 0) {  return false }
	
	var endStr =  [];
	var strList =  [];
	
	for (inc in tools) {
		var argStr = [];
		var comStr = [];
		for (var argInc in tools[inc].args) {
			argStr = argStr + (text.White + "<");
			if (String(tools[inc].aFlags[argInc]).length > 0) {
				argStr = argStr + (text.Red + tools[inc].aFlags[argInc] + text.Gold + text.Arrow);
			}
			argStr = argStr + (text.Red + tools[inc].args[argInc] + text.White + ">");
		}
	
		 comStr = comStr + (text.Gold + tools[inc].keys[0] + " \u00A7c" + argStr + "\n");
		 comStr = comStr + (text.White + text.Italics + tools[inc].note);
		 strList.push (comStr);
	}
	strList.sort();
	for (inc in strList) {
		endStr = (endStr + strList[inc] + "\n");
	}
	player.print("\n" + text.White + "Command List - Type " + text.Red + "/cs build ? " + text.Gold + "command" + text.White + " for detailed info. \n \n");
	player.print(endStr);
	//saveFile("CommandList", endStr);
	mode = 1;
	return true;
	
}


//////////////////////////////////////////////////////////
//				Player Tool Commands
//////////////////////////////////////////////////////////


function ClearNature(vec) {
	this.name =  "Clear Nature";	
	this.note = "Destroys and clears all natural blocks.";
	this.keys = ["clear", "clearnature"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 20;
	size = gSize != -1 ? gSize + (gSize * Math.random()*.2) : size;

	var blackList = [6,17,18,31,32,37,38,39,40,59,78,81,83,86,103,104,105,106,111,115,127,141,142];
	
	for (var x = 0; x <= size; x++) {
		for (var z = 0; z <= size; z++) {
			for (var y = size; y >= 0; y--) {					
				pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
				distance = getDistance(vec, pos);

				if (distance > size/2) {continue;}
				if (blackList.indexOf(session.getBlock(pos).getType()) == -1) {continue;}

				session.setBlock(pos, new BaseBlock(0));

			}
		}
	}

}


//#######################				MOVE TO OTHER SECTION
function BuildTimerTool(runFunction, vec) {

	var modeBlackList = [15,24];
	
	try{
		if (this.state == true) {
			return false;
		}
		else {
			this.state = true;
		}

		//var myVec = vec;
		//var myFunction = runFunction;
		
		var taskTool = new TimerTask() {
			mySub: runFunction,
			vec: vec,
			session: session,
			cnt: 0,
			run : function() {
				try {
					this.cancel();
					this.mySub(this.vec);
					localSession.remember(session);					
				}
				catch(e) {
					player.print("Brush Task Error: " + e);
				}
			}
		}
		//if (typeof gTimer == 'undefined') gTimer = new Timer;
		gTimer.schedule(taskTool, 0)
		this.state = false;
		return;
	}
	catch(e) {
		player.print("Timer Error: " + e);
		this.state = false;
	}
}
//#######################

function BuildTree(vec) {
	this.name =  "Tree";	
	this.note = "Creates a randomly generated tree type.";
	this.keys = ["tree"];
	this.args = {
		0 : { 
			name: "treeType", 
			note: "Type of tree to create. - Required",
			flag: "",
			type: "string", 
			defArg: "small",
		},
		1 : { 
			name: "size", 
			note: "Size or height of the tree.",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		2 : { 
			name: "maxChange", 
			note: "Max possible change in the tree height.",
			flag: "m",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},	
		3 : { 
			name: "woodBlock", 
			note: "Block type the wood should be.",
			flag: "w",
			type: "block", 
			defArg: 15,
		},
		4 : { 
			name: "leafBlock",
			note: "Block tyoe the leaves should be.",
			flag: "l",
			type: "block",
			defArg: 0
		},
		5 : {
			name: "clumpLeaves",
			note: "Flag to change the generated leaves to clump style",
			flag: "c",
			type: "flag",
			defArg: null
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	var treeType = argv.length > 2 ? String(argv[2]).toLowerCase() : "";
	var typeCheck = -1;
	for (inc in trees) {
		if (treeType == String(inc).toLowerCase())
			typeCheck = 1;
	}
	if (typeCheck == -1) {
		if (vecList.length > 0)
			return false;
		var tmpStr = text.White + "[ ";
		for (inc in trees) {tmpStr = tmpStr + text.Gold + String(inc).toLowerCase() + text.White + " | ";}
		
		player.print("\n" + text.Red + "Error: " + text.White + "Tree type " + text.Gold + treeType + text.White + " not found.");
		player.print(text.White + text.Italics + "Available tree types: \n" + tmpStr + "]");
		return true;
	}
	if (vecList.length == 0)
		return false;
	
	var treeType = argv.length > 2 ? String(argv[2]).toLowerCase() : "large";
	var maxChg = checkFlag("m", 3) ? parseInt(checkFlag("m", 3)) : (trees[treeType].maxChg + trees[treeType].minSize) / 5;
	var size = checkFlag("s", 3) ? Math.round(parseInt(checkFlag("s", 3)) + (Math.random()*maxChg)) : Math.round((Math.random() * (trees[treeType].maxChg)) + trees[treeType].minSize);
	var woodBlock = checkFlag("w", 3) ? parseBlock(checkFlag("w", 3)) : trees[treeType].woodBlock;
	var leafBlock = checkFlag("l", 3) ? parseBlock(checkFlag("l", 3)) : trees[treeType].leafBlock;

	size = gSize != -1 ? gSize + (gSize * (Math.random() * maxChg)) : size;
	trees[treeType].mySub(vec, session, size, woodBlock, leafBlock);
	
	return true;
	
}

function BuildShape(vec) {
	this.name =  "Shape";	
	this.note = "Load a shape object from the selection, shape file, or web address.";
	this.keys = ["shape", "load"];
	this.args = {
		0 : { 
			name: "fileName", 
			note: "Shape file name, or internet address location. - Required",
			flag: "",
			type: "string", 
			defArg: null,
		},
		1 : { 
			name: "angleLock",
			note: "Option to lock shape to specified angle only.",
			flag: "<",
			type: "value",
			defArg: 0,
			min: 0,
			max: 10 
		},
		2 : {
			name: "excludeBlock",
			note: "Block type to skip when placing loaded shape.",
			flag: "!",
			type: "block",
			defArg: 15,
		},
		3 : {
			name: "updateSelection",
			note: "Flag to update the selection to the placed shapes bounding box.",
			flag: "$",
			type: "flag",
			defArg: 15,
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) {
		if ((argv.length < 3) || (String(argv[2]) == "-")) { 
			if (context.getSession().isSelectionDefined(context.getSession().getSelectionWorld()) != true)  {
				player.print(text.Red + "Error: " + text.White + "You must have a region selected, or filename for this!");
			}
			else {
				player.print(text.Gold + tools[mode].name + text.White + " brush bound to " + text.Gold + ItemType.toHeldName(player.getItemInHand()) + ". " );
				player.print(text.White + text.Italics + "Click to specify selection shape " + text.Gold + "origin" + text.White + " point.");
			}
			return true;
		} 
		loadShape(vec, session);	
		return true;
	}
	if(myShape.length != 0) {
		var mat = (gMat == airMat) ? airMat : gMat;
		var excludeID = checkFlag("!") ? parseBlock(checkFlag("!")).getType() : -1;
		
		var angle = checkFlag("<") ? parseFloat(checkFlag("<")) : getDirection().rightAngle;
		angle = checkFlag("<") == 360 ? getDirection().yaw : angle;
		
		CreateShape(myShape['TMP'], vec, angle, mat, excludeID, invert);
	}
	else {
		if (argv.length < 3 || String(argv[2]) == "-") {
			loadShape(vec, session)
			return false;
		}
	}

}

function BuildShapeKit(vec){
	this.name =  "Shape Kit";	
	this.note = "Loads and binds a list of custom shapes from a kit file, or web address.";
	this.keys = ["kit", "shapekit"];
	this.args = {
		0 : { 
			name: "fileName", 
			note: "Kit file name, or internet address location. - Required",
			flag: "",
			type: "string", 
			defArg: null,
		},
		1 : { 
			name: "angleLock",
			note: "Option to lock shapes to specified angle only.",
			flag: "<",
			type: "value",
			defArg: 0,
			min: 0,
			max: 10 
		},
		2 : {
			name: "excludeBlock",
			note: "Block type to skip when placing loaded shapes.",
			flag: "!",
			type: "block",
			defArg: 15
		},
		3 : {
			name: "random",
			note: "Flag to specify placing any random shape from the kit file.",
			flag: "r",
			type: "flag",
			defArg: null
		},
		4 : {
			name: "updateSelection",
			note: "Flag to update the selection to the placed shapes bounding box.",
			flag: "$",
			type: "flag",
			defArg: null
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	//for(var dbs in ItemID)	printDebug("ItemID[dbs]", ItemID[dbs]); 
	
	
	if (vecList.length == 0) { 
		if (argv.length < 3)  {
			player.print(text.Red + "Error:" + text.White + " You need to specify a .kit file name to load.");
			return true;
		}
	}
	else if (vecList.length > 0 && myKit.length == 0)	return true;

	if (myKit.length != 0) {
		for (var inc in myKit) {
			
			if (player.getItemInHand() == myKit[inc].item) {
				var mat = ((gMat == airMat)) ? airMat : gMat;
				var excludeID = checkFlag("!") ? parseBlock(checkFlag("!")).getType() : -1;
				
				var angle = checkFlag("<") ? parseFloat(checkFlag("<")) : getDirection().rightAngle;
				angle = checkFlag("<") == 360 ? getDirection().yaw : angle;
				if(checkFlag("r", 3)) {inc = Math.round(Math.random()*(myKit.length-1))}
				
				CreateShape(myShape[inc], vec, angle, mat, excludeID, invert);
			}
		}
		return true;
	}
	else {
	
		var tmpKit = new Array();
		var toolKit = new Array();
		
		var fileArg = String(argv[2]);
		var file;
		if (checkFlag("$")) {
			file = openFileDialog();
			if (file == undefined) return;
			fileArg = file.getName();
			print("file arg = " + fileArg);
		}
		
		var extStr = String(fileArg.slice(fileArg.indexOf(".")).toLowerCase());		
		var fileName = fileArg;

		var aStr = fileName.slice((fileName.length)-4).toLowerCase();
		if (aStr == ".kit") {fileName = String(argv[2]).slice(0, String(argv[2]).length-4).toLowerCase()};

		file = file == undefined ? context.getSafeFile("shapes", String(fileName + '.kit')) : file;
		
		printDebug("file.length", file.length);
		// if(!file.exists()){
			// player.print(text.Red + "Error! " + text.Gold + "Could not find kit file: " + text.White + text.Italics + file);
			// return true;
		// }

		player.print(text.White + text.Italics + "Loading shapes from kit file: " + text.Gold + fileName + ".kit"); 
		var kitStr = loadFile(file, 3);

		tmpKit = parseKitFile(kitStr);
		for (inc in tmpKit) {		//this is where the brushes get set to the loaded shapeKit list
			context.getSession().setTool(tmpKit[inc].item, null)
			toolKit[inc] = context.getSession().getBrushTool(tmpKit[inc].item);
			toolKit[inc].setFill(airMat);
			toolKit[inc].setBrush(brush, "worldedit.brush.buildShapeKit");
		}
	
		myKit = tmpKit;
		loadShapeKit(vec, session, tmpKit);
		return true;
	}

}

function BuildGrassPatch(vec) {
	this.name =  "Grass Patch";	
	this.note = "Creates a random patch of long grass(super bonemeal!)";
	this.keys = ["grass", "grasspatch", "bonemeal"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size.",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : {
			name: "density",
			note: "Density of the placed grass and flowers.",
			flag: "d",
			type: "percentage",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 15;
	var density = checkFlag("d") ? parseFloat(checkFlag("d")) : .25;
	size = gSize != -1 ? gSize + (gSize * Math.random()*.2) : size;
	
	var blackList = [0,6,31,32,37,38,39,40,81,106];
	var whiteList = [2,3,88];
	
	for (var x = 0; x <= size; x++) {
		for (var z = 0; z <= size; z++) {
			for (var y = size; y >= 0; y--) {					
				pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
				distance = getDistance(vec, pos);

				if (distance > size/2) {continue;}
				if (blackList.indexOf(session.getBlock(pos).getType()) == -1) {continue;}
				if (blackList.indexOf(session.getBlock(pos.add(0,1,0)).getType()) == -1) {continue;}
				if (whiteList.indexOf(session.getBlock(pos.add(0,-1,0)).getType()) == -1) {continue;}		
				if (density > Math.random()) {
				
					session.setBlock(pos, getListBlock(blocks["plants"].list));

				}
			}
		}
	}

}

function BuildForest(vec) {
	this.name =  "Forest";	
	this.note = "Creates a random patch of trees to specified min and max heights.";
	this.keys = ["forest", "trees", "treepatch"];
	this.args = {
		0 : { 
			name: "treeType", 
			note: "Type of trees to create. - Required",
			flag: "",
			type: "string", 
			defArg: "small",
		},
		1 : { 
			name: "size", 
			note: "Size of the brush - range to place trees.",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		2 : { 
			name: "density", 
			note: "Density of the placed trees.",
			flag: "d",
			type: "value", 
			defArg: 15,
			min: 1,
			max: 100
		},
		3 : { 
			name: "minSize/maxChange", 
			note: "Min tree size and / Max possible height change",
			flag: "m",
			type: "min/max", 
			defArg: 15,
			min: 0,
			max: 500
		},	
		4 : { 
			name: "woodBlock", 
			note: "Block type the wood should be.",
			flag: "w",
			type: "block", 
			defArg: 15,
		},
		5 : { 
			name: "leafBlock",
			note: "Block tyoe the leaves should be.",
			flag: "l",
			type: "block",
			defArg: 0
		},
		6 : {
			name: "clumpLeaves",
			note: "Flag to change the generated leaves to clump style",
			flag: "c",
			type: "flag",
			defArg: null
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;	
	var treeType = argv.length > 2 ? String(argv[2]).toLowerCase() : "";
	var typeCheck = -1;
	for (inc in trees) {
		if (treeType == String(inc).toLowerCase())
			typeCheck = 1;
	}
	if (typeCheck == -1) {
		if (vecList.length > 0)
			return false;
		var tmpStr = text.White + "[ ";
		for (inc in trees) {tmpStr = tmpStr + text.Gold + String(inc).toLowerCase() + text.White + " | ";}
		
		player.print("\n" + text.Red + "Error: " + text.White + "Tree type " + text.Gold + treeType + text.White + " not found.");
		player.print(text.White + text.Italics + "Available tree types: \n" + tmpStr + "]");
		return true;
	}
	if (vecList.length == 0)
		return false;

	var size = checkFlag("s", 3) ? parseInt(checkFlag("s", 3)) : 30;
	var density = checkFlag("d", 4) ? parseFloat(checkFlag("d", 3)) : 5;
	var woodBlock = checkFlag("w", 4) ? parseBlock(checkFlag("w", 3)) : trees[treeType].woodBlock;
	var leafBlock = checkFlag("l", 4) ? parseBlock(checkFlag("l", 3)) : trees[treeType].leafBlock;
	size = gSize != -1 ? gSize + (gSize * Math.random()*.2) : size;
	var mat = (gMat == airMat) ? new SingleBlockPattern(woodBlock) : gMat;
	density *= .01;
	
	if (checkFlag("m", 3)) {
		var minSize = parseBlockExtra(checkFlag("m", 3)).block.getType();
		var maxChg = parseBlockExtra(checkFlag("m", 3)).extra;
	}
	else {
		var minSize = trees[treeType].minSize;
		var maxChg = trees[treeType].maxChg;
	}
	
	var blackList = [0,1,6,7,8,9,10,11,17,18,31,32,37,38,39,40,81,106];		//don't attach to these blocks
	var whiteList = [0,6,30,31,32,37,38,39,40,83,106,111,127];
	
	var world = session.getWorld()
	var treeCount = 0;
	var tryCount = 0;
	for (var findTree = 0; findTree < ((size*size)/10); findTree++) { 
	
		if (tryCount > size*size*100) { 
		print("Too many tries");
		break;}
		
		var randomOffset = Vector(parseInt(Math.random()*size - size/2), parseInt((Math.random()*size) - size/2), parseInt((Math.random()*size) - size/2));
		var randomVec = vec.add(randomOffset);
		var surfaceVec = randomVec;
		surfaceVec.setY(session.getHighestTerrainBlock(randomVec.getX(), randomVec.getZ(), randomVec.getY()-size/2, randomVec.getY()+size/2, false));
		var surfaceBlock = session.getBlock(surfaceVec);
	
		if ((blackList.indexOf(surfaceBlock.getType())) != -1 || whiteList.indexOf(session.getBlock(surfaceVec.add(0,1,0)).getType()) == -1 || getDistance(vec, surfaceVec) > size/2 || world.getBlockLightLevel(surfaceVec.add(0,1,0)) == 0) {
			--findTree;
			++tryCount;
			continue;
		}
		
		if (density > Math.random()) {
			var treeSize = (Math.random() * maxChg) + minSize;
			trees[treeType].mySub(surfaceVec, session, treeSize, mat, leafBlock);
			treeCount++;
			
			
			// var treeSetup = JavaImporter(Packages.com.sijobe.spc.worldedit, Packages.com.sijobe.spc.wrapper, Packages.com.sijobe.spc.command, Packages.net.minecraft.src.WorldGenBigTree, java.util.Random);	
			// with (treeSetup) {
				
				// var spcPlayer = MinecraftServer.getPlayerByUsername(player.getName());
				// var worldBase = spcPlayer.getWorld().getMinecraftWorld();
				//var world = World(worldBase);
				// var random = new Random;
				
				// var p = new Class();
				// var treeTest = net.minecraft.src.WorldGenBigTree;
				// for (p in String(treeTest)) printDebug("treeTest[" + p + "]", treeTest[p]);
				//var treeTest = new minecraft.src.WorldGenBigTree(true).generate(worldBase, random, surfaceVec.getX(), surfaceVec.getY(), surfaceVec.getZ())
				//printDebug("treeTest", treeTest);
			//var treeGenType = TreeGenerator.lookup("tree");
			//var treeGen  = new TreeGenerator(treeGenType);
			//var treeGenType = treeGen
			//treeGen.generate(session, surfaceVec);
			// }			
		}
		
	}
	//print("Tree total = " + treeCount);
	return;
	
}

function BuildOverlayPatch(vec){
	this.name =  "Overlay";	
	this.note = "Covers all natural surfaces to custom blocks and depths.";
	this.keys = ["overlay", "overlaypatch", "over"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "topBlock/depth",
			note: "Top block of overlay/depth of this layer.",
			flag: "t",
			type: "string",
			defArg: 0
		},
		2 : { 
			name: "midBlock/depth",
			note: "Middle block of overlay/depth of this layer.",
			flag: "m",
			type: "string",
			defArg: 0
		},
		3 : { 
			name: "endBlock/depth",
			note: "End block of overlay/depth of this layer.",
			flag: "e",
			type: "string",
			defArg: 0
		},
		4 : { 
			name: "coverAll",
			note: "Flag to allow overlay to cover any block.",
			flag: "a",
			type: "flag",
			defArg: 0
		},
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var block = [];
	var depth = [];
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 15;
	size = gSize != -1 ? gSize : size;
	
	
	if (checkFlag("t")) {
		block[0] = parseBlockExtra(checkFlag("t")).block; 
		depth[0] = parseBlockExtra(checkFlag("t")).extra;
	}
	else {
		block[0] = new BaseBlock(2, 0);
		depth[0] = 0;
	}
	
	if (checkFlag("m")) {
		block[1] = parseBlockExtra(checkFlag("m")).block;
		depth[1] = parseBlockExtra(checkFlag("m")).extra;
	}
	else {
		block[1] = new BaseBlock(3, 0);
		depth[1] = 0;
	}
	
	if (checkFlag("e")) {
		block[2] = parseBlockExtra(checkFlag("e")).block;
		depth[2] = parseBlockExtra(checkFlag("e")).extra;
	}
	else {
		block[2] = new BaseBlock(1, 0);
		depth[2] = 0;
	}
	
	block[0] = (gMat == airMat) ? new SingleBlockPattern(block[0]) : gMat;
	
	if (depth[0] < 1) {
		depth[0] = 1;
		depth[1] = 2;
		depth[2] = 3;
	}
	
	var whiteList = [0,6,17,18,31,32,37,38,39,40,78,81,83,86,106];				//The blocks allowed to be over the natural block
	var greenList = [1,2,3,12,13,14,15,16,21,24,56,73,82,87,88,110,121,129];	//List of natural blocks that should be changed
	
	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {
							
				pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
				distance = getDistance(vec, pos);

				if (distance > size/2) {continue;}
				if(!checkFlag("a")) {
					if (greenList.indexOf(session.getBlock(pos).getType()) == -1) {continue;}
					if (whiteList.indexOf(session.getBlock(pos.add(0,1*invert,0)).getType()) == -1) {continue;}
				}
				else {
					if (session.getBlock(pos).getType() == 0) {continue;}
					if (session.getBlock(pos.add(0,1*invert,0)).getType() != 0) {continue;}
				}
				
				var totalDepth = depth[0] + depth[1] + depth[2];
				for (var inc = 0; inc < totalDepth; inc++) {
					if (!checkFlag("a"))
						if (greenList.indexOf(session.getBlock(pos.add(0,(0-inc)*invert,0)).getType()) == -1) {break;}
					if (inc < depth[0]) {
						if ((block[0].next(0,0,0).getType() == 0) && (block[0].next(0,0,0).getData() != 0)) {continue;}		//If air is used, and has a non zero data value skip it
						session.setBlock(pos.add(0,(0-inc)*invert,0), block[0]);
					
					}
					else if (inc >= depth[0] && inc < (depth[0] + depth[1]))  {
						if ((block[1].getType() == 0) && (block[1].getData() != 0)) {continue;}
						session.setBlock(pos.add(0,(0-inc)*invert,0), block[1]);
					}
					else {
						if ((block[2].getType() == 0) && (block[2].getData() != 0)) {continue;}
						session.setBlock(pos.add(0,(0-inc)*invert,0), block[2]);
					}
				}
			}
		}
	}
}

function BuildFlat(vec) {		// Add option to extend to sky limit, or ground limit?
	this.name =  "Flatten";	
	this.note = "Level all terrain and objects to a custom height.";
	this.keys = ["flatten", "flat", "level"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "yLevel",
			note: "Exact y level depth the land should be leveled to.",
			flag: "y",
			type: "value",
			defArg: 0,
			min: 0,
			max: 10
		},
		2 : {
			name: "surfaceBlock",
			note: "Block type the surface should be.",
			flag: "b",
			type: "block",
			defArg: 15,
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	//if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 15;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) : new BaseBlock(2, 0);
	var depth = checkFlag("d") ? parseFloat(checkFlag("d")) : 62;
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	size = gSize != -1 ? gSize : size;

	
	var fillList = [0,8,9,10,11];	//fill these blocks if they are in the path

	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {
							
				pos = vec.add(x - size/2 + .5, parseInt(y - size/2 + .5), z - size/2 + .5);
				distance = getDistance(vec, pos);
				totalDepth = pos.getY() - depth;
				
				if (distance > size/2) {continue;}
				if ((session.getBlock(pos).getType() == 0) && (totalDepth != 0)) {continue;}
				
				if (totalDepth > 0) {			//Clearing Down
					for (var inc = 0; inc <= totalDepth; inc++) {

						if (mat.next(0,0,0).getType() == 0) {totalDepth-10;}
						if (inc == totalDepth) {
							if (mat.next(0,0,0).getType() == 0) {continue;}		//Skip if air is used
							session.setBlock(pos.add(0,(0-inc),0), mat);
						}
						else {
							session.setBlock(pos.add(0,(0-inc),0), new BaseBlock(0));
						}
					}
				}
				else if (totalDepth < 0) {		//Filling Up
					for (var inc = 0; inc >= totalDepth; inc--) {
						if (session.getBlock(pos.add(0,(0-inc),0)).getType() == 0) {
							session.setBlock(pos.add(0,(0-inc),0), mat);
						}

					}
				}
				
				
				else if (totalDepth == 0) {
					session.setBlock(pos, mat)
					for (inc = 1; inc < 256; inc++) {
						if (fillList.indexOf(session.getBlock(pos.add(0,(0-inc),0)).getType()) == -1) {break;}
						session.setBlock(pos.add(0,(0-inc),0), mat);
						
					}
				}
			}
		}
	}
}

function BuildSpike(vec) {
	this.name =  "Spike";	
	this.note = "Creates a custom spike angled to specified position.";
	this.keys = ["spike", "cone"];
	this.args = {
		0 : { 
			name: "baseSize", 
			note: "Size of the spike base.",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use.",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "minLength/maxChange",
			note: "Min spike length / Max amount of change.",
			flag: "l",
			type: "min/max`",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 8;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) : new BaseBlock(1, 0);
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	size = gSize != -1 ? gSize : size;
	
	if (checkFlag("l")) {
		var minSize = parseBlockExtra(checkFlag("l")).block.getType();
		var maxChg = parseBlockExtra(checkFlag("l")).extra;
	}
	else {
		var minSize = 50;
		var maxChg = 15;
	}

	var length = (Math.random() * maxChg) + minSize;
	var end = getDistanceVec(vec, player.getBlockIn(), length);

	CreateSpike(vec, end, mat, session, size);
	
}

function BuildVines(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "density",
			note: "Density of the vine placement.",
			flag: "d",
			type: "percentage",
			defArg: 0,
			min: 0,
			max: 500
		},
		2 : { 
			name: "length",
			note: "Max possible length the vines should extend.",
			flag: "b",
			type: "block",
			defArg: 0,
			min: 0,
			max: 10
			},
		3 : {
			name: "block",
			note: "Alternate block type to use instead of vines.",
			flag: "b",
			type: "block",
			defArg: 15, 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var size = typeof checkFlag("s") === 'boolean' ? parseInt(checkFlag("s")) : 12;
	var density = checkFlag("d") ? parseFloat(checkFlag("d")) : .25;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(BlockID.VINE, 0);
	var length = checkFlag("l") ? parseInt(checkFlag("l")) : 12;
	var attachBlock = checkFlag("a") ? parseBlock(checkFlag("a")) :  false;	
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	size = gSize != -1 ? gSize : size;
	
	var rand = new java.util.Random();

	var blackList = [0,6,8,9,31,32,37,38,39,40,81,83,86,106];		//Do not place vines on these blocks

	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {
							
				pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
				var distance = getDistance(vec, pos);
				var curBlock = session.getBlock(pos);

				if (distance > size/2) {continue;}
				if (Math.random() > density) {continue;}
				if (curBlock.getType() != 0) {continue;}
				
				var vines = new Array();
				vines[1] = new BaseBlock(BlockID.VINE, 8);  
				vines[2] = new BaseBlock(BlockID.VINE, 2);  
				vines[3] = new BaseBlock(BlockID.VINE, 1);  
				vines[4] = new BaseBlock(BlockID.VINE, 4); 

				var blockFaces = new Array();
				blockFaces[1] = session.getBlockType(pos.add(1,0,0));
				blockFaces[2] = session.getBlockType(pos.add(-1,0,0));
				blockFaces[3] = session.getBlockType(pos.add(0,0,1));
				blockFaces[4] = session.getBlockType(pos.add(0,0,-1));
				
				var solidSide = new Array();
				for (var inc = 1; inc <= 4; inc++) {
					
				if ((blackList.indexOf(blockFaces[inc]) != -1) || (blockFaces[inc] == mat.next(0,0,0).getType())) {continue;}
					if (blockFaces[inc] != 0) {
						solidSide.push(inc)
					}												
				}
				if ((solidSide.length >= 1)){
					randomSide = solidSide[(rand.nextInt(solidSide.length))];
					randomLength = rand.nextInt(length);
					var newVine = vines[randomSide];
					for (var extendVine = 0; extendVine <= randomLength; extendVine++) {
						if (session.getBlockType(pos.add(0,-(extendVine),0)) == 0) {
							if (mat.next(0,0,0).getType() == BlockID.VINE) {
								session.setBlock(pos.add(0,-(extendVine),0), newVine);
							}
							else {
								session.setBlock(pos.add(0,-(extendVine),0), mat);
							}
							continue;
						}
						break;
					}
				}
			}
		}
	}	
}

function BuildLine(vec) {
	this.name =  "Line";	
	this.note = "Draws a custom line in single, continous, or fixed origin mode.";
	this.keys = ["line", "lines"];
	this.args = {
		0 : { 
			name: "lineMode", 
			note: "",
			flag: "m",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "size", 
			note: "Brush size.",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		2 : { 
			name: "block",
			note: "Block type to use.",
			flag: "b",
			type: "block",
			defArg: 0
		},
		3 : {
			name: "extendCnt",
			note: "Amount to extend past points, negative to shorten.",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var lineMode = checkFlag("m") ? parseInt(checkFlag("m")) : 1;
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 1;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(1);
	var extendCnt = checkFlag("e") ? parseInt(checkFlag("e")) :  0;
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	size = gSize != -1 ? gSize : size;	
	
	var baseVec = zVec;

	if (stage == 0) {
		player.print(text.White + text.Italics + "Origin set!");
		gVec = vec;
		stage++;
		return;
	}
	
	switch(lineMode) {	//lineMode - 0 = Single Line; 1 = Continous; 2 = Fixed Origin.

	case 0:
		
		if (stage == 1) {
			baseVec = gVec;
			stage++;
		}
		else {
			gVec = vec;
			player.print(text.White + text.Italics + "Origin set!");
			stage--;
		}
		break;
	case 1:
		baseVec = gVec;
		gVec = vec;
		break;
	case 2:
		baseVec = gVec;
		break;					
	}

	if((lineMode == 1) || (lineMode == 2) || (stage == 2)) {
	
		var distance = getDistance(baseVec, vec);
		var step = .9/distance;
		var extendBase = (extendCnt * step);
		
		for(var i = 0; i <= (1 + extendBase); i += step) {
				
			var xi = vec.getX() + ((baseVec.getX() - vec.getX()) * i);
			var yi = vec.getY() + ((baseVec.getY() - vec.getY()) * i);
			var zi = vec.getZ() + ((baseVec.getZ() - vec.getZ()) * i);
			var pos = new Vector(xi, yi, zi);

			if (size == 0) {
				session.setBlock(pos, mat );
			}
			else {
				CreateSphere(size, 1, pos, mat, session);
			}
		}
	}
	
}

function BuildPlatform(vec){			// ########## CONTINUE CLASS CONVERT HERE
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }
	
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 3;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(20);
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	size = gSize != -1 ? gSize : size;	
	
	vec = player.getBlockIn();
	vec = vec.add(0,-1,0);
	
	for (var x = 0; x <= size; x++) {
		for (var z = 0; z <= size; z++) {
			
			pos = vec.add(x - size/2 + .5, 0, z - size/2 + .5);
			distance = getDistance(vec, pos);
			
			if (distance > size/2) {continue;}
			session.setBlock(pos, mat);
		}
	}
}

function BuildBiome(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { 
		vecList.push(vec);
		if (BuildBiome((vec), session) != true)  { return true; }
		else { return false; }
		//player.print(text.Red + text.Italics + "Changes won't become effective until a chunk reload.");	
		//return true; 
	}
	
	if (!worldEdit) {return false;}
	
	var biome;
	if (argv.length < 3) { biome = "Swampland"; }
	else {biome = String(argv[2]).toUpperCase();}

	var size = checkFlag("s", 3) ? parseInt(checkFlag("s", 3)) : 7;
	size = gSize != -1 ? gSize : size;

	var biomeList = String(worldEdit.getServer().getBiomes().all());
	
	try{
		target = BiomeType(worldEdit.getServer().getBiomes().get(biome));
	}
	catch (e) {
		player.print("\n" + text.Red + "Error: " + text.White + "Biome type " + text.Red + biome.toLowerCase() + text.White + " not found.");
		player.print(text.Gold + text.Italics + "Available Biome Types: \n" + text.White + biomeList);
		return false;
	}
	
	if (vecList.length <= 1) {
		player.print(text.Gold + biome + text.White + " biome found.");
		return true;
	}
	
	for (var x = 0; x <= size; x++) {
		for (var z = 0; z <= size; z++) {
			
			pos = vec.add(x - size/2 + .5, 0, z - size/2 + .5);
			distance = getDistance(vec, pos);
			
			if (distance > size/2) {continue;}
			
			player.getWorld().setBiome(Vector2D(pos.getX(),pos.getZ()), target);

		}
	}
	session.simulateSnow(vec, size/2);
	if ($spc != false) session.thaw(vec, size/2);

}

function BuildMirror(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }
	
	var world = context.getSession().getSelectionWorld();
	var region = context.getSession().getSelection(world);
	
	var pos = region.getMinimumPoint();
	var width = region.getWidth();
	var length = region.getLength();
	var height = region.getHeight();
	var vec2 =  player.getBlockIn();
	var dirInfo = getDirection();	

	if ((dirInfo.rightAngle == 0) || (dirInfo.rightAngle == 180)) {
		var offDir = pos.getX()-vec.getX();

		for (x = 0; x < width; x++)	 {
			for (y = 0; y < height; y++)	 {
				for (z = 0; z < length; z++)	 {

					var tmpVec = pos.add(x, y, z);
					var offLen = (offDir + x);
					var newVec = tmpVec.add(-(offLen*2),0,0);
					var tmpBlock = session.getBlock(tmpVec);
					tmpBlock.flip(CuboidClipboard.FlipDirection.NORTH_SOUTH);
					
					if (checkFlag("d")) {
						session.setBlock(tmpVec, airMat);
					}	
					session.setBlock(newVec, tmpBlock);
					
					if (checkFlag("s")) {
						if((x == 0) && (y == 0) && (z == 0)) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectPrimary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
						if((x == (width-1)) && (y == (height-1)) && (z == (length-1))) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectSecondary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
					}
				}
			}
		}
	}
	
	if ((dirInfo.rightAngle == 90) || (dirInfo.rightAngle == 270)) {
		var offDir = pos.getZ()-vec.getZ();

		for (x = 0; x < width; x++)	 {
			for (y = 0; y < height; y++)	 {
				for (z = 0; z < length; z++)	 {
	
					var tmpVec = pos.add(x, y, z);
					var offLen = (offDir + z);
					var newVec = tmpVec.add(0,0,-(offLen*2));
					var tmpBlock = session.getBlock(tmpVec);
					
					tmpBlock.flip(CuboidClipboard.FlipDirection.WEST_EAST);
					
					if (checkFlag("d")) {
						session.setBlock(tmpVec, airMat);
					}
					session.setBlock(newVec, tmpBlock);
	
					if (checkFlag("s")) {
						if((x == 0) && (y == 0) & (z == 0)) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectPrimary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
						if((x == (width-1)) && (y == (height-1)) && (z == (length-1))) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectSecondary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
					}
				}
			}
		}
	}
	

}

function BuildLaser(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 1;
	var depth = checkFlag("d") ? parseInt(checkFlag("d")) :  0;
	var blockA = checkFlag("a") ? parseBlock(checkFlag("a")) :  new BaseBlock(1);
	var matB = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(1);
	var matA = (gMat == airMat) ? new SingleBlockPattern(blockA) : gMat;
	size = gSize != -1 ? gSize : size;

	var origin = player.getBlockIn().add(0,1,0);
	var distance = getDistance(origin, vec);
	var step = .9/distance;
	var extendBeam = 1 + (depth*step);
	
	for( var i = 0; i <= extendBeam; i += step) {
		
		if (i < ((size*step) + step*2)) {continue;}
		
		var xi = origin.getX() + ((vec.getX() - origin.getX()) * i);
		var yi = origin.getY() + ((vec.getY() - origin.getY()) * i);
		var zi = origin.getZ() + ((vec.getZ() - origin.getZ()) * i);
		var pos = new Vector(xi, yi, zi);
		
		if (i <= 1) {
			if (size == 1) {
				session.setBlock(pos, matA);
			}
			else {
				CreateSphere(size, 1, pos, matA, session);
			}		
		}
		else if (i > 1) {
			if (size == 1) {
				session.setBlock(pos, matB);
			}
			else {
				CreateSphere(size, 1, pos, matB, session);
			}
		}

	}
}
	
function BuildRevolve(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var pointOver = checkFlag("c") ? parseInt(checkFlag("c")) : 0;
	var bTypeB = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(0);

	var world = context.getSession().getSelectionWorld();
	var region = context.getSession().getSelection(world);

	var regionMin = new Vector(region.getMinimumPoint().getX(), region.getMinimumPoint().getY(), region.getMinimumPoint().getZ());
	var bTypeA = new BaseBlock(0);

	var pointRes = 16;

	for (var x = 0; x < region.getWidth(); x++ ) {
		for (var y = 0; y < region.getHeight(); y++ ) {
			for (var z = 0; z < region.getLength(); z++) {
				
				var pos = regionMin.add(x, y, z);
				var id = session.getBlock(pos);
				var bCheck = 0;	
				if (bTypeB.getType() != 0) {bCheck = id.getType() != bTypeB.getType() ? 1 : 0};		
																									
				if (((id.getType()) != (bTypeA.getType())) && (bCheck == 0))  		
			 {			
					var radZ = Math.abs(vec.getZ()-pos.getZ());	
					var radX = Math.abs(vec.getX()-pos.getX());
					var radius = radX > radZ ? radX : radZ;	
					
					var points = pointOver != 0 ? pointOver : (pointRes * radius);
					var slice = 2 * Math.PI / points;
					
					for (var i = 0; i < (points); i++)
				 {
						var angle = (slice * i);
						var newX = (radius * Math.cos(angle));
						var newY = (radius * Math.sin(angle));
						var newZ = (pos.getY() - vec.getY());
						var pt = vec.add(newX, newZ, newY);	

						session.setBlock(pt, id);
					}
				}			
			}
		}
	}
}

function BuildRotate(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }
	
	var angleArg = checkFlag("i") ? parseInt(checkFlag("i")) : 8;
	var resolution = checkFlag("r") ? parseInt(checkFlag("r")) : 4;
	var singleMode = checkFlag("s") ? true : false;

	var world = context.getSession().getSelectionWorld();
	var region = context.getSession().getSelection(world);

	angleArg = angleArg == 0 ? 8 : angleArg;
	angleStep = angleArg < 0 ? Math.abs(angleArg) : (360/angleArg);

	var step = 1 / resolution;
	
	for (var x = 0; x < region.getWidth(); x += step) {
		for (var z = 0; z < region.getLength(); z += step) {
			for (var y = 0; y < region.getHeight(); y += 1) {
				
				var tmpVec = region.getMinimumPoint().add(x, y, z);
				
				var block = session.getBlock(tmpVec);
				if (block.getType() == BlockID.AIR) {continue;}
				
				var angle = angleStep;				
				while (angle < 360) {
					
					var newVec = Vector(rotateVec(vec, tmpVec, angle));
					var oldVec = Vector(rotateVec(vec, newVec, -angle));
					
					if (session.getBlock(oldVec).getType() == block.getType() && session.getBlock(newVec).getType() != block.getType()) {

						session.setBlock(newVec, block);
					}
					
					if (singleMode) {angle = 360;}
					angle += angleStep;
				}	
			}
		}
	}
}

function BuildErode(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	
	if (vecList.length == 0) {
		
		if (checkFlag("d")) {
			vecList.push(vec);
			BuildBlender(vec, session);
			return false;			
		}
		else { return false; }
	}
	
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 8;
	var maxFaces = checkFlag("f") ? parseInt(checkFlag("f")) :  3;
	var strength = checkFlag("i") ? parseInt(checkFlag("i")) :  1;
	var rngChance = checkFlag("i") ? parseInt(checkFlag("i")) :  100;
	size = gSize != -1 ? gSize : (size != 0 ? size : 4);	
	maxFaces = (gMat == airMat) ? maxFaces : gMat.next(zVec).getType();
	
	var blocks = [];
	var blackList = [0,8,9,10,11];
	
	for (iteration = 1; iteration <= strength; iteration++) {
		
		var blockTotal = 0;			
		var blockCnt = 0;			
		var blockFaces = new Array(6);
		
		for (var x = 0; x <= size; x++) {
			for (var y = 0; y <= size; y++) {
				for (var z = 0; z <= size; z++) {					
					pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
					distance = getDistance(vec, pos);
					if (distance > size/2) {continue;}
					
					var curBlock = session.rawGetBlock(pos);
					
					if (blackList.indexOf(curBlock.getType()) != -1) { 
						blocks[blockTotal] = curBlock.getType();
						blockTotal++;
						continue;
					}
					
					var blockCnt = 0;
					var blockFaces = [];	//check around the six sides of the current loop block position
					blockFaces[0] = session.rawGetBlock(pos.add(1,0,0)).getType();
					blockFaces[1] = session.rawGetBlock(pos.add(-1,0,0)).getType();
					blockFaces[2] = session.rawGetBlock(pos.add(0,0,1)).getType();
					blockFaces[3] = session.rawGetBlock(pos.add(0,0,-1)).getType();
					blockFaces[4] = session.rawGetBlock(pos.add(0,1,0)).getType();
					blockFaces[5] = session.rawGetBlock(pos.add(0,-1,0)).getType();
	
					sideBlock = 0;		//Search our blockFaces list for water or lava
					for (var inc in blockFaces) {
						if (blackList.indexOf(blockFaces[inc]) != -1) {
						
							blockCnt++;
							if (inc < 4) {		//If water/lava is found in one of the side positions then make the new block the same
								if(blockFaces[inc] == 8 || blockFaces[inc] == 9) {
									sideBlock = 9;
								}
								else if(blockFaces[inc] == 10 || blockFaces[inc] == 11) {
									sideBlock = 11;
								}
							}
						}				
					}
					
					if (blockCnt >= maxFaces) {	
						blocks[blockTotal] = sideBlock > 0 ? sideBlock : BlockID.AIR;
					}
					else {
						blocks[blockTotal] = curBlock.getType();
					}
					blockTotal++;

				}
			}
		}
		
		var setBlockTotal = 0;		//rerun the loop using same variables to set blocks in the right order
		for (var x = 0; x <= size; x++) {
			for (var y = 0; y <= size; y++) {
				for (var z = 0; z <= size; z++) {				
					pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
					distance = getDistance(vec, pos);
					if (distance > size/2) {continue;}
					
					var ID = blocks[setBlockTotal];

					session.setBlock(pos, new BaseBlock(ID));
					setBlockTotal++;

				}
			}
		}
	}

}

function BuildFill(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;

	if (vecList.length == 0) {
		if (checkFlag("d")) {
			vecList.push(vec);
			BuildBlender(vec, session);
			return false;			
		}
		else { return false; }
	}
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 8;
	var maxFaces = checkFlag("f") ? parseInt(checkFlag("f")) :  2;
	var strength = checkFlag("i") ? parseInt(checkFlag("i")) :  1;
	size = gSize != -1 ? gSize : (size != 0 ? size : 4);	
	maxFaces = (gMat == airMat) ? maxFaces : gMat.next(zVec).getType();
	
	var blocks = [];
	var blackList = [0,6,8,9,10,11,30,31,32,37,38,39,40,83,106,111,127];
	
	for (iteration = 1; iteration <= strength; iteration++) {
		
		var blockTotal = 0;			
		var blockCnt = 0;			
		var blockFaces = new Array(6);
		
		for (var x = 0; x <= size; x++) {
			for (var y = 0; y <= size; y++) {
				for (var z = 0; z <= size; z++) {					
					pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
					distance = getDistance(vec, pos);
					if (distance > size/2) {continue;}
					
					var curBlock = session.rawGetBlock(pos);
					
					if (blackList.indexOf(curBlock.getType()) == -1) {
						blocks[blockTotal] = curBlock;
						blockTotal++;
						continue;
					}
					
					var blockCnt = 0;
					var blockFaces = [];
					
					blockFaces[0] = session.rawGetBlock(pos.add(1,0,0)).getType() + (.01 * session.getBlockData(pos.add(1,0,0)));
					blockFaces[1] = session.rawGetBlock(pos.add(-1,0,0)).getType() + (.01 * session.getBlockData(pos.add(-1,0,0)));
					blockFaces[2] = session.rawGetBlock(pos.add(0,1,0)).getType() + (.01 * session.getBlockData(pos.add(0,1,0)));
					blockFaces[3] = session.rawGetBlock(pos.add(0,-1,0)).getType() + (.01 * session.getBlockData(pos.add(0,-1,0)));
					blockFaces[4] = session.rawGetBlock(pos.add(0,0,1)).getType() + (.01 * session.getBlockData(pos.add(0,0,1)));
					blockFaces[5] = session.rawGetBlock(pos.add(0,0,-1)).getType() + (.01 * session.getBlockData(pos.add(0,0,-1)));	
					
					var newArray = compressArray(blockFaces);
					var maxFace = new Object()
					
					for (var inc in blockFaces) {
						if (blackList.indexOf(Math.floor(blockFaces[inc])) == -1) {
							blockCnt++;
						}
					}
					
					for (q in newArray) {
						if (blackList.indexOf(newArray[q].value) == -1) {
							if (typeof maxFace.value === "undefined") {
								maxFace = newArray[q];
							}							
							if (newArray[q].count > maxFace.count) {
								maxFace = newArray[q];
							}
						}
					}
					
					if (blockCnt >= maxFaces){
						if (typeof maxFace.value === "undefined") {
							blocks[blockTotal] = new BaseBlock(BlockID.STONE);
						}
						else {
							blocks[blockTotal] = new BaseBlock(maxFace.value, maxFace.data);
						}
					}	
					else {
						blocks[blockTotal] = curBlock;
					}
					blockTotal++;

				}
			}
		}
		
		var setBlockTotal = 0;
		for (var x = 0; x <= size; x++) {
			for (var y = 0; y <= size; y++) {
				for (var z = 0; z <= size; z++) {				
					pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
					distance = getDistance(vec, pos);
					if (distance > size/2) {continue;}
					
					session.setBlock(pos, blocks[setBlockTotal]);
					setBlockTotal++;

				}
			}
		}
	}

}

function BuildWand(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { 
		vecList.push(vec);
		BuildWand(zVec, session);
		player.print(text.Gold + "Smart Wand" + text.White + " tool bound to " + text.Gold + ItemType.toHeldName(player.getItemInHand()) + ". " );
		return true; 
	}
	
	var wandTool = new DoubleActionTraceTool({
		canUse : function(player) {
			return player.hasPermission("worldedit.tool.wand");
		},
		actPrimary : function(server,config,player,session) {
			var vec = player.getBlockIn()
			if (vec == null) { return; }
			var selector = session.getRegionSelector(player.getWorld());
			if (selector.selectSecondary(vec)) {
				session.dispatchCUISelection(player);
			}
			return;
		},
		actSecondary : function(server,config,player,session) {
			
			var vec = checkFlag("~") ? player.getBlockTrace(parseInt(checkFlag("~")), true) : player.getBlockTrace(200, false);
			if (vec == null) { return; }

			var selector = session.getRegionSelector(player.getWorld());
			var setVec = selector.isDefined() ? selector.getPrimaryPosition(): zVec.toBlockVector();
			
			if (setVec.equals(vec.toBlockVector())) {
				selector.clear();
				session.dispatchCUISelection(player);
				player.print(text.White + text.Italics + "Selection cleared.");
				return;
			}

			if (selector.selectPrimary(vec)) {
				session.dispatchCUISelection(player);
			}
			return;

		},	
	});
	
	context.getSession().setTool(player.getItemInHand(), wandTool);

}

function BuildOre(vec)	 {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 20;
	var density = checkFlag("d") ? parseInt(checkFlag("d")) : 100;
	var overBlockID = checkFlag("b") ? parseBlock(checkFlag("b")).getType() :  BlockID.STONE;
	var origin = vec.add(0 - size/2 + .5, 0 - size/2 + .5, 0 - size/2 + .5);
	
	var width = size;
	var height = size;
	var length = size;
	var area = width * height * length;
	
	if(checkFlag("r")) {
		var world = localSession.getSelectionWorld();
		var region = localSession.getSelection(world);
	
		var width = Math.abs(region.getMaximumPoint().getX() - region.getMinimumPoint().getX());
		var height = Math.abs(region.getMinimumPoint().getY() - region.getMaximumPoint().getY());
		var length = Math.abs(region.getMinimumPoint().getZ() - region.getMaximumPoint().getZ());
		var area = width * height * length;
		var origin = new Vector(
				region.getMinimumPoint().getX(), //+width/2,
				region.getMinimumPoint().getY(), //+height/2,
				region.getMinimumPoint().getZ() //+length/2
				);
	}

	
	var densityStep = 300;
	var maxPoints = (area / densityStep) * (density / 100);
	
	for (var pointStep = 0; pointStep < maxPoints; pointStep++) {
		
		var randOffset = Vector(Math.random()*width, Math.random()*height, Math.random()*length);
		var randPnt = origin.add(randOffset);
		
		if (getDistance(vec, randPnt) > size/2) continue;
		var testOre = [];
		var maxOreID = 0;
		var maxOreChance = 0;
		var chanceMax = 0;

		for (var findOre in oreList) {
			
			if (randPnt.getY() <= 0) { continue; }
			
			if ((oreList[findOre].minY <= randPnt.getY()) && (oreList[findOre].maxY >= randPnt.getY())) {
				
				var tmpOre = {
					myOreID: findOre,
					minChance: chanceMax,
					maxChance: chanceMax + oreList[findOre].chance
				};
				testOre.push(tmpOre);
				chanceMax += oreList[findOre].chance;
			}
		}
		
		if (testOre.length < 1)	 continue; 
		
		var randomProb = Math.random() * chanceMax;

		for (var getOre in testOre) {
			if ((randomProb >= testOre[getOre].minChance) && (randomProb <= testOre[getOre].maxChance)) {
				maxOreID = testOre[getOre].myOreID;
			}
		}
		
		var bType = new BaseBlock(oreList[maxOreID].BlockID);
		var newLength = (Math.floor(Math.random() * oreList[maxOreID].maxSize - oreList[maxOreID].minSize) + oreList[maxOreID].minSize);
		//setBlock(randPnt.add(0,1,0), bType);
		if (getBlock(randPnt).getType() == overBlockID)
			CreateRandom(randPnt, 3, bType, new BaseBlock(overBlockID), newLength, 1, 1, 1 );
		
	}
}


//########################				FIGURE OUT WHAT TO DO WITH THIS FUNCTION - (MERGE WITH OTHER)	
function BuildOreVein(vec)	 {

	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 20;
	var density = checkFlag("d") ? parseInt(checkFlag("d")) : 100;
	var overBlockID = checkFlag("b") ? parseBlock(checkFlag("b")).getType() :  BlockID.STONE;
	var origin = vec.add(0 - size/2 + .5, 0 - size/2 + .5, 0 - size/2 + .5);

	var width = size;
	var height = size;
	var length = size;
	var area = width * height * length;
	
	if(checkFlag("r")) {
		var world = localSession.getSelectionWorld();
		var region = localSession.getSelection(world);
	
		width = Math.abs(region.getMaximumPoint().getX() - region.getMinimumPoint().getX());
		height = Math.abs(region.getMinimumPoint().getY() - region.getMaximumPoint().getY());
		length = Math.abs(region.getMinimumPoint().getZ() - region.getMaximumPoint().getZ());
		area = width * height * length;
		origin = new Vector(region.getMinimumPoint().getX(), region.getMinimumPoint().getY(), region.getMinimumPoint().getZ());
	}
	
	var rand = new java.util.Random(); 	
	var densityStep = 300;
	var maxVeinSize = 12;

	var maxPoints = (area / densityStep) * (density / 100);

	for (var pointStep = 0; pointStep < maxPoints; pointStep++) {
		
		var randPnt = origin.add(rand.nextInt(width), rand.nextInt(height), rand.nextInt(length));
		printDebug("randPnt", randPnt);
		var randPnt2 = randPnt.add(rand.nextInt(maxVeinSize)*2-maxVeinSize, rand.nextInt(maxVeinSize)*2-maxVeinSize, rand.nextInt(maxVeinSize)*2-maxVeinSize);
		//printDebug("randPnt2", randPnt2);
		if (getBlock(randPnt).getType() != overBlockID) {continue;}
		var distance = getDistance(randPnt, randPnt2);
		
		var testOre = [];
		var maxOreID = 0;
		var maxOreChance = 0;
		var chanceMax = 0;

		for (var findOre in oreList) {
			
			if (randPnt.getY() <= 0) { continue; }
			
			if ((oreList[findOre].minY <= randPnt.getY()) && (oreList[findOre].maxY >= randPnt.getY())) {
				
				var tmpOre = {
					myOreID: findOre,
					minChance: chanceMax,
					maxChance: chanceMax + oreList[findOre].chance
				};
				testOre.push(tmpOre);
				chanceMax += oreList[findOre].chance;
			}
		}
		
		if (testOre.length < 1)	 continue; 
		
		var randomProb = Math.random() * chanceMax;

		for (var getOre in testOre) {
			if ((randomProb >= testOre[getOre].minChance) && (randomProb <= testOre[getOre].maxChance)) {
				maxOreID = testOre[getOre].myOreID;
			}
		}
		
		var bType = new BaseBlock(oreList[maxOreID].BlockID);
		var newLength = (rand.nextInt(oreList[maxOreID].maxSize - oreList[maxOreID].minSize) + oreList[maxOreID].minSize);
		var distance = getDistance(randPnt, randPnt2);

		for( var i = 0; i <= 1; i += (.9/distance)) {
				
			var xi = randPnt.getX() + ((randPnt2.getX() - randPnt.getX()) * i);
			var yi = randPnt.getY() + ((randPnt2.getY() - randPnt.getY()) * i);
			var zi = randPnt.getZ() + ((randPnt2.getZ() - randPnt.getZ()) * i);
							
			var vecA = new Vector(xi, yi, zi);
			if(vecA.getY() <= 0) { continue; }
			
			if (session.getBlock(vecA).getType() == overBlockID) {
				session.setBlock(vecA, bType);	
			}
		}
	}
}
//########################


function BuildFragment(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }
	
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 7;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) : new BaseBlock(1);
	var density = checkFlag("d") ? parseFloat(checkFlag("d")) : .75;
	var hollow = checkFlag("h") ? parseInt(checkFlag("h")) : 0;

	size = gSize != -1 ? gSize + (gSize * Math.random()*.2) : size;
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;	
	
	CreateLeafSphere(size, size, density, hollow, vec.add(0,-(size/2),0), mat, session);

}

function BuildSpawner(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var entityList = [
		"bat", "chicken", "cow", "pig", "sheep", "squid", "villager", "enderman", "pigzombie", "blaze",
		"creeper", "ghast", "silverfish", "wither", "slime", "lavaslime", "spider", "cavespider", "witch",
		"zombie", "ozelot", "wolf", "villagergolem", "snowman", "enderdragon", "witherboss", "giant", "boat",
		"minecart", "mushroomcow", "endercrystal", "item", "xporb", "arrow", "snowball", "fireball", "smallfireball"
	]

	var type = argv.length > 2 ? String(argv[2]).toLowerCase() : "-";
	entityList.sort();
	
	for (inc in entityList) {
		
		if(type == "all")
			session.setBlock(vec.add(0,parseInt(inc)+1,0), MobSpawnerBlock(entityList[inc].toLowerCase()));
		
		if(entityList[inc].toLowerCase() == type) {
			session.setBlock(vec.add(0,1,0), MobSpawnerBlock(entityList[inc].toLowerCase()));
			return;
		}
	}
	
	if (type != "all") {
		player.print("\n" + text.Red + "Error: " + text.White + "Entity type " + text.Gold + type + text.White + " not found.");
		player.print(text.Gold + text.Italics + "Available Entity Types: \n" + text.White + "[" + entityList + "]");
	}	

}

function BuildKiller(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var entityType = argv.length > 2 ? String(argv[2]).toLowerCase() : false;
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 7;
	size = gSize != -1 ? gSize : size;
	
	var pos1 = Vector(vec.getX()-size/2, vec.getY()-size/2, vec.getZ()-size/2);
	var pos2 = Vector(vec.getX()+size/2, vec.getY()+size/2, vec.getZ()+size/2);
	var region = new CuboidRegion(pos1, pos2);
		
	/* Entity killing - unstable
	
	var entities = player.getWorld().getEntities(region);
	for (var entity in entities) {
		var tmp2 = entities[entity].getPosition().position;
		var tmp3 = entities[entity].getClass().getType();
		player.print("Entity Killed @ " + String(tmp2) + String(tmp3));
		
		for (sube in  entities[entity])	
			//player.print(sube);

	}
	player.getWorld().killEntities(entities);
	*/
	
	/* Entity Spawning
	    public LocalEntity[] pasteEntities(Vector pos) {
        LocalEntity[] entities = new LocalEntity[this.entities.size()];
        for (int i = 0; i < this.entities.size(); ++i) {
            CopiedEntity copied = this.entities.get(i);
            if (copied.entity.spawn(copied.entity.getPosition().setPosition(copied.relativePosition.add(pos)))) {
                entities[i] = copied.entity;
            }
        }
        return entities;
    }
	
	
	*/
	
	/* Alt killing method - unstable
	
	var entities = player.getWorld().getWorld().getLivingEntities();
	
	var cnt = 0;
	for (var inc = 0; inc < entities.size(); inc++) {
		var entity = entities.get(inc);
		var type = String(entity.getType()).toLowerCase();
		var loc = entity.getLocation();
		var pos = new Vector(parseInt(loc.getX()), parseInt(loc.getY()), parseInt(loc.getZ()));
		
		//player.print("what the hell?!" + entity + type + pos);
		if (region.contains(pos)) {
			player.print("inside");
			if (!(entityType) || (type == entityType)) {
				entity.remove();
			}
		}
		//player.print("any luck?");
		
	}
	*/

}

function BuildPattern(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	if (argv.length < 3)  {
		player.print (text.Red + "Error:" + text.White + " You need to specify a pattern type to use.");
		return false;
	}

	var blockList = String(argv[2]).toLowerCase();
	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 10;
	blockList = blockList == "-" ? "ruin" : blockList;
	size = gSize != -1 ? gSize : size;
	
	if (blocks[blockList] == undefined) {
		player.print(text.Red + "Error:" + text.White + " Pattern type " + text.Gold + blockList + text.White + " not found.");
		return;
	}
	
	var blackList = [0,6,31,32,37,38,39,40,81,106];
	
	for (var x = 0; x <= size; x++) {
		for (var y = 0; y <= size; y++) {
			for (var z = 0; z <= size; z++) {					
				pos = vec.add(x - size/2 + .5, y - size/2 + .5, z - size/2 + .5);
				distance = getDistance(vec, pos);

				if (distance > size/2) {continue;}
				
				if (blackList.indexOf(session.getBlock(pos).getType()) != -1) {continue;}
					
				session.setBlock(pos, getListBlock(blocks[blockList].list));
				//session.setBlock(pos, getListBlock(blocks["Plants"].list));


			}
		}
	}

}

function BuildArray(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var world = context.getSession().getSelectionWorld();
	var region = context.getSession().getSelection(world);

	var cnt1 = checkFlag("a") ? parseInt(checkFlag("a")) : 0;
	var cnt2 = checkFlag("b") ? parseInt(checkFlag("b")) : 0;
	var cnt3 = checkFlag("c") ? parseInt(checkFlag("c")) : 0;

	var copyAir = false;

	switch(stage) {

		case 0:
		case 1:
			offsetVec[0] = vec;
			offsetVec[1] = vec;	
			offsetVec[2] = vec;	
			offsetVec[3] = vec;	
			player.print(text.White + "Origin point #1 set to [" + vec.getX() + ", " + vec.getY() + ", " + vec.getZ() + "]");
			player.print(text.Gold + text.Italics + "Ready for offset point #1.");
			stage = 2;
			break;
			
		case 2:
			offsetVec[1] = vec.add(-(offsetVec[0].getX()), -(offsetVec[0].getY()), -(offsetVec[0].getZ()));
			var pStr1 = (text.White + "Offset point #1 set to [" + vec.getX() + ", " + vec.getY() + ", " + vec.getZ() + "]\n")
			var pStr2 = (text.White + "Point #1 Offset Total: [" + offsetVec[1].getX() + ", " + offsetVec[1].getY() + ", " + offsetVec[1].getZ() + "]")
			player.print(pStr1 + pStr2);
			if (cnt2 == 0) {
				stage = 7;
				break;
			}
			player.print(text.Gold + text.Italics + "Ready for origin point #2.");
			stage++;
			break;				
		case 3:
			offsetVec[0] = vec;
			player.print(text.White + "Origin point #2 set to [" + vec.getX() + ", " + vec.getY() + ", " + vec.getZ() + "]");
			player.print(text.Gold + text.Italics + "Ready for offset point #2.");
			stage++;
			break;		

		case 4:
			offsetVec[2] = vec.add(-(offsetVec[0].getX()), -(offsetVec[0].getY()), -(offsetVec[0].getZ()));
			var pStr1 = (text.White + "Offset point #2 set to [" + vec.getX() + ", " + vec.getY() + ", " + vec.getZ() + "]\n")
			var pStr2 = (text.White + "Point #2 Offset Total: [" + offsetVec[2].getX() + ", " + offsetVec[2].getY() + ", " + offsetVec[2].getZ() + "]")
			player.print(pStr1 + pStr2);
			if (cnt3 == 0) {
				stage = 7;
				break;
			}
			player.print(text.Gold + text.Italics + "Ready for origin point #3.");
			stage++;
			break;				
		case 5:
			offsetVec[0] = vec;
			player.print(text.White + "Origin point #3 set to [" + vec.getX() + ", " + vec.getY() + ", " + vec.getZ() + "]");
			player.print(text.Gold + text.Italics + "Ready for offset point #3.");
			stage++;
			break;	

		case 6:
			offsetVec[3] = vec.add(-(offsetVec[0].getX()), -(offsetVec[0].getY()), -(offsetVec[0].getZ()));
			var pStr1 = (text.White + "Offset point #3 set to [" + vec.getX() + ", " + vec.getY() + ", " + vec.getZ() + "]\n")
			var pStr2 = (text.White + "Point #3 Offset Total: [" + offsetVec[3].getX() + ", " + offsetVec[3].getY() + ", " + offsetVec[3].getZ() + "]")
			player.print(pStr1 + pStr2);
			stage++;
			break;
	}

	if (stage == 10) {
	
		var min = region.getMinimumPoint();
		var max = region.getMaximumPoint();

		var minX = min.getBlockX();
		var minY = min.getBlockY();
		var minZ = min.getBlockZ();
		var maxX = max.getBlockX();
		var maxY = max.getBlockY();
		var maxZ = max.getBlockZ();
		
		var setPos = new Vector;
		var setPos2 = new Vector;
		
		for (var x = minX; x <= maxX; ++x) {
			for (var z = minZ; z <= maxZ; ++z) {
				for (var y = minY; y <= maxY; ++y) {
				
					var block = session.getBlock(new Vector(x, y, z));
					if (!block.isAir() || copyAir) {
						for (var i = 0; i <= cnt1; ++i) {
							setPos = Vector(x + offsetVec[1].getX() * i, y + offsetVec[1].getY() * i, z + offsetVec[1].getZ() * i);

							for (var j = 0; j <= cnt2; ++j) {
								setPos2 = Vector(setPos.add(offsetVec[2].getX() * j, offsetVec[2].getY() * j, offsetVec[2].getZ() * j));
								for (var k = 0; k <= cnt3; ++k) {
									setPos3 = Vector(setPos2.add(offsetVec[3].getX() * k, offsetVec[3].getY() * k, offsetVec[3].getZ() * k));
								
									session.setBlock(setPos3, block);
								}
								session.setBlock(setPos2, block);
							}
						}
					}
				}
			}
		}
		player.print(text.White + "Array complete!");
		stage = 0;
	}
	
	if (stage == 7) {
		player.print(text.Gold + text.Italics + "Everything is set!" + text.White + text.Italics + " Click once more to perform the array stack!");
		stage = 10;
	}

}

function BuildMap(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	//if (vecList.length == 0) { return false; }

 	if (argv.length > 2) {
		var fileStr = String(argv[2]).toLowerCase();
	}
	else {		//no file specified
		player.print(text.Red + "Error: " + text.White + "You must specify a filename to save to.");
		return false;
	} 

	var mapWidth = checkFlag("w", 3) ? parseInt(checkFlag("w", 3)) : 256;
	var mapHeight = checkFlag("h", 3) ? parseInt(checkFlag("h", 3)) : 256;
	var file = context.getSafeFile("shapes", String(fileStr) + '.png');
	var shadeByHeight = checkFlag("s", 3) ? false : true;
	
	try {
		var tmpRob = new java.awt.Robot();
		tmpRob.keyPress(java.awt.event.KeyEvent.VK_ESCAPE);
	}
	catch(e) { }
	
	var vecStart = new Vector(vec.getX()-Math.round(mapWidth/2), 0, vec.getZ()-Math.round(mapHeight/2));
	var vecEnd = new Vector(vec.getX()+Math.round(mapWidth/2), 255, vec.getZ()+Math.round(mapHeight/2));
	

	var img = generateSurfaceImage(vecStart, vecEnd, shadeByHeight);
	
	if(!file.exists()){
		file.createNewFile();
	}
	
	ImageIO.write(img, "png", file);
	player.print(text.White + "Map image successfully saved to:\n" + text.Gold + file);
	
	try {
		var tmpRob = new java.awt.Robot();
		tmpRob.keyPress(java.awt.event.KeyEvent.VK_ESCAPE);
	}
	catch(e) { }

}

function BuildFlip(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var world = context.getSession().getSelectionWorld();
	var region = context.getSession().getSelection(world);
	
	var pos = region.getMinimumPoint();
	var width = region.getWidth();
	var length = region.getLength();
	var height = region.getHeight();
	var vec2 =  player.getBlockIn();
	var dirInfo = getDirection();	

	if ((dirInfo.rightAngle == 0) || (dirInfo.rightAngle == 180)) {
		var offDir = pos.getX()-vec.getX();
		player.print("Test2");
		for (x = 0; x < width; x++)	 {
			for (y = 0; y < height; y++)	 {
				for (z = 0; z < length; z++)	 {
					
					var tmpVec = pos.add(x,y,z);
					var tmpBlock = session.getBlock(tmpVec);
					var offLen = Math.abs(offDir + x);
					
					if ((tmpVec.getX()+width/2) <= vec.getX())
						var newVec = Vector(vec.getX()+y,vec.getY()+offLen,pos.getZ()+z);
					if ((tmpVec.getX()+width/2) > vec.getX())
						var newVec = Vector(vec.getX()-y,vec.getY()+offLen,pos.getZ()+z);
									
					if (checkFlag("d")) {
						session.setBlock(tmpVec, airMat);
					}					
					session.setBlock(newVec, tmpBlock);
					
					if (checkFlag("s")) {
						if((x == 0) && (y == 0) & (z == 0)) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectPrimary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
						if((x == (width-1)) && (y == (height-1)) && (z == (length-1))) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectSecondary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
					}
				}
			}
		}
		return true;
	}
	
	if ((dirInfo.rightAngle == 90) || (dirInfo.rightAngle == 270)) {
		var offDir = pos.getZ()-vec.getZ();
		for (x = 0; x < width; x++)	 {
			for (y = 0; y < height; y++)	 {
				for (z = 0; z < length; z++)	 {
				
					var tmpVec = pos.add(x,y,z);
					var tmpBlock = session.getBlock(tmpVec);
					var offLen = Math.abs(offDir + z);
					
					if ((pos.getZ()+length/2) <= vec.getZ())
						var newVec = Vector(pos.getX()+x,vec.getY()+offLen,vec.getZ()+y);
					if ((pos.getZ()+length/2) > vec.getZ())
						var newVec = Vector(pos.getX()+x,vec.getY()+offLen,vec.getZ()-y);
					
					
					//if(tmpBlock.getType() == BlockID.AIR) {continue}	
					if (checkFlag("d")) {
						session.setBlock(tmpVec, airMat);
					}					
					session.setBlock(newVec, tmpBlock);

					if (checkFlag("s")) {
						if((x == 0) && (y == 0) & (z == 0)) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectPrimary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
						if((x == (width-1)) && (y == (height-1)) && (z == (length-1))) {
							var selector = context.getSession().getRegionSelector(player.getWorld());
							if (selector.selectSecondary(newVec)) {
								context.getSession().dispatchCUISelection(player);
							}
						}
					}
				}
			}
		}
		player.print("I made it");
		return true;	
	}




}

function BuildBox(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }
	setBlockThread(4, 1, 1000);

	var xSize = checkFlag("x") ? parseInt(checkFlag("x")) : 10;
	var ySize = checkFlag("y") ? parseInt(checkFlag("y")) : 20;
	var zSize = checkFlag("z") ? parseInt(checkFlag("z")) : 30;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(1);
	var insideBlock = checkFlag("i") ? parseBlock(checkFlag("i")) :  false;
	var hollow = checkFlag("h") ? parseInt(checkFlag("h")) : false;
	var angled = checkFlag("a") ? true : false;	
	
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;

	var dirInfo = getDirection();	

	if (!angled) {
		if ((dirInfo.rightAngle == 0) || (dirInfo.rightAngle == 180)) {
			var tmpSize = xSize;
			xSize = zSize;
			zSize = tmpSize;
		}
	}
		
	
	if (holdThread(true) == false)	return false;
	
	var step = angled ? .7 : 1;
	for (var x = 0; x < xSize; x += step) {
		for (var y = 0; y < ySize; y += step) {
			for (var z = 0; z < zSize; z += step) {
				
				 if (hollow) {
					if (((x >= hollow) && (x < xSize-hollow)) && ((y >= hollow) && (y < ySize-hollow)) && ((z >= hollow) && (z < zSize-hollow))) {
						if(!insideBlock) {continue;}
						
						var pt = vec.add((x-xSize/2), (y*invert+invert), (z-zSize/2));
						if (angled) {pt = rotateVec(vec, pt, dirInfo.yaw);}
						
						//setBlock(pt, insideBlock);
						setLater(pt, insideBlock);
						continue;
						
					}
				 }
		
				var pt = vec.add((x-xSize/2), (y*invert+invert), (z-zSize/2));
				if (angled) {pt = rotateVec(vec, pt, dirInfo.yaw);}
		
				//setBlock(pt, mat);
				setLater(pt, mat);
			}
		}
	}
	holdThread(false);
}

function BuildSphere(vec) {
	this.name =  "Sphere";	
	this.note = "Creates a sphere shape out of the specified block.";
	this.keys = ["sphere", "sp", "round"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 10,
			min: 1,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 1
		},
		2 : { 
			name: "hollow",
			note: "Sphere shell thickness",
			flag: "h",
			type: "value",
			defArg: 0,
			min: 0,
			max: 500
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var size = checkFlag("s") ? parseInt(checkFlag("s")) : 10;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(1);
	var hollow = checkFlag("h") ? parseInt(checkFlag("h")) : 0;
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	
	CreateSphere(size, hollow, vec, block);
	
}

function BuildEllipse(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var xSize = checkFlag("x") ? parseInt(checkFlag("x")) : 16;
	var ySize = checkFlag("y") ? parseInt(checkFlag("y")) : 8;
	var zSize = checkFlag("z") ? parseInt(checkFlag("z")) : 48;
	var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(20);
	var insideBlock = checkFlag("i") ? parseBlock(checkFlag("i")) :  false;
	var hollow = checkFlag("h") ? true : false;
	var angled = checkFlag("a") ? true : false;
	
	var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	var dirInfo = getDirection();

	function lengthSq(x, y, z) {return (x * x) + (y * y) + (z * z);}
	
	var xOff = ['1', '-1', '1', '1', '-1', '1', '-1', '-1'];
	var yOff = ['1', '1', '-1', '1', '-1', '-1', '1', '-1'];
	var zOff = ['1', '1', '1', '-1', '1', '-1', '-1', '-1'];

	radiusX = xSize/2 + 0.5;
	radiusY = ySize/2 + 0.5;
	radiusZ = zSize/2 + 0.5;

	var invRadiusX = 1 / radiusX;
	var invRadiusY = 1 / radiusY;
	var invRadiusZ = 1 / radiusZ;

	var ceilRadiusX = Math.ceil(radiusX);
	var ceilRadiusY = Math.ceil(radiusY);
	var ceilRadiusZ = Math.ceil(radiusZ);
	
	var step = angled ? .7 : 1;
	var nextXn = 0;
	forX: for (var x = 0; x <= ceilRadiusX; x += step) {
		var xn = nextXn;
		nextXn = (x + 1) * invRadiusX;
		var nextYn = 0;
		forY: for (var y = 0; y <= ceilRadiusY; y += step) {
			var yn = nextYn;
			nextYn = (y + 1) * invRadiusY;
			var nextZn = 0;
			forZ: for (var z = 0; z <= ceilRadiusZ; z += step) {
				var zn = nextZn;
				nextZn = (z + 1) * invRadiusZ;

				var distanceSq = lengthSq(xn, yn, zn);
				if (distanceSq > 1) {
					if (z == 0) {
						if (y == 0) {
							break forX;
						}
						break forY;
					}
					break forZ;
				}

				if (hollow) {
					if (lengthSq(nextXn, yn, zn) <= 1 && lengthSq(xn, nextYn, zn) <= 1 && lengthSq(xn, yn, nextZn) <= 1) {
						if (insideBlock) {
							for (var dirLoop = 0; dirLoop <= 7 ; dirLoop++) {
							
								var setPnt = vec.add(x * xOff[dirLoop], y * yOff[dirLoop], z * zOff[dirLoop]);
								if (angled) {setPnt = rotateVec(vec, setPnt, dirInfo.yaw);}
								session.setBlock(setPnt, insideBlock);
							}
							
						}
						continue;
					}
				}
				
				
				for (var dirLoop = 0; dirLoop <= 7 ; dirLoop++) {

					var setPnt = vec.add(x * xOff[dirLoop], y * yOff[dirLoop], z * zOff[dirLoop]);
					if (angled) {setPnt = rotateVec(vec, setPnt, dirInfo.yaw);}
					session.setBlock(setPnt, mat);
					
				}
			}
		}
	}




}

function BuildSpiral(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var radius = checkFlag("r") ? parseInt(checkFlag("r")) : 10;
	var compress = checkFlag("s") ? parseInt(checkFlag("s")) : 8;
	var coilCnt = checkFlag("c") ? parseInt(checkFlag("c")) : 3;
	var dFlag = checkFlag("d") ? true : false;
	var hFlag = checkFlag("f") ? true : false;

	//var mat = (gMat == airMat) ? new SingleBlockPattern(block) : gMat;
	radius = gSize != -1 ? gSize : radius;
	compress = compress == 0 ? 1 : compress;

	var origin = vec;
	var cb = localSession.getClipboard();
	cb.copy(session);

	if(radius <= 0) {
		
		radius = radius * .1;
		var increment = .01;
		var maxAngle = Math.PI * 2 * coilCnt;
		var gap = Math.abs(radius);

		for (var angle = 0; angle <= maxAngle; angle = angle + increment)
	 {
			var newX = (angle * gap * Math.cos(angle));
			var newY = (angle * gap * Math.sin(angle));
			var newZ = (angle/(compress/10))
			
			if (hFlag) {
				var pt = origin.add(newX, newY*invert, newZ);
				if (dFlag)  {
					var pt2 = origin.add((-newX), (-newY*invert), newZ);
				}
			}
			else {
				var pt = origin.add(newX, newZ*invert, newY);
				if (dFlag)  {
					var pt2 = origin.add((-newX), (newZ*invert), (-newY));
				}
			}
			cb.paste(session, pt, true);
			
			if (dFlag)  {
				cb.paste(session, pt2, true);
			}
		}
	}
	else {
	
		var points = 256;
		var slice = 2 * Math.PI / points;
		var pt;
		var loopCnt = 0;
		for (var i = 0; i < (points * coilCnt); i++) {

			var angle = slice * i;

			var newX = (radius * Math.cos(angle));
			var newY = (radius * Math.sin(angle));
			var newZ = (i/(compress*2));
			
			if (hFlag) {
				var pt = origin.add(newX, newY*invert, newZ);
				if (dFlag)  {
					var pt2 = origin.add(-newX, (-newY*invert), newZ);
				}
			}
			else {
				var pt = origin.add(newX, newZ*invert, newY);
				if (dFlag)  {
					var pt2 = origin.add(-newX, newZ*invert, -newY);
				}
			}
			cb.paste(session, pt, true);
			
			if (dFlag)  {
				cb.paste(session, pt2, true);
			}
		}	
	}
	
}

function BuildMineSweeper(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length == 0) { return false; }

	var xSize = checkFlag("x") ? parseInt(checkFlag("x")) : 24;
	var zSize = checkFlag("y") ? parseInt(checkFlag("y")) : 12;
	var mineTotal = checkFlag("m") ? parseInt(checkFlag("m")) : 40;
	
	if (checkFlag("b")) {
		xSize = 9;
		zSize = 9;
		mineTotal = 10;
	}
	if (checkFlag("i")) {
		xSize = 16;
		zSize = 16;
		mineTotal = 40;
	}
	if (checkFlag("e")) {
		xSize = 16;
		zSize = 30;
		mineTotal = 99;
	}
	
//		-x+y|0x+y|+x+y			Offset reference
//		-x0y|####|+x0y
//		-x-y|0x-y|+x-y

	offsetList = {			//Helpful when checking around a block
		1: Vector(-1,0,1),
		2: Vector(-1,0,0),
		3: Vector(-1,0,-1),
		4: Vector(0,0,1),
		5: Vector(0,0,-1),
		6: Vector(1,0,1),
		7: Vector(1,0,0),
		8: Vector(1,0,-1)
	};
		
	mineBlocks = {			//Block set for # of mines in the area
		0: new BaseBlock(BlockID.STONE, 0),			//No mines
		1: new BaseBlock(BlockID.COAL_ORE, 0),		//One mine	
		2: new BaseBlock(BlockID.IRON_ORE, 0),		//Two mines...
		3: new BaseBlock(BlockID.GOLD_ORE, 0),
		4: new BaseBlock(BlockID.LAPIS_LAZULI_ORE, 0),	
		5: new BaseBlock(BlockID.REDSTONE_ORE, 0),
		6: new BaseBlock(BlockID.DIAMOND_ORE, 0),
		7: new BaseBlock(BlockID.EMERALD_ORE, 0),
		8: new BaseBlock(BlockID.OBSIDIAN, 0),
		9: new BaseBlock(46, 0),				//Mine Block
		10: new BaseBlock(42, 0),				//Surface Block
		11: new BaseBlock(98, 0),				//Wall Base Block
		12: new BaseBlock(139, 0),				//Wall Block
		13: new BaseBlock(123, 0)				//Flag Marker
	};
	
	if (checkFlag("w")) {
		mineBlocks = {			//Alt Wool block set for # of mines in the area
			0: new BaseBlock(35, 0),
			1: new BaseBlock(35, 3),
			2: new BaseBlock(35, 5),
			3: new BaseBlock(35, 6),
			4: new BaseBlock(35, 11),	
			5: new BaseBlock(35, 14),
			6: new BaseBlock(35, 9),
			7: new BaseBlock(35, 13),
			8: new BaseBlock(35, 7),
			9: new BaseBlock(35, 15),
			10: new BaseBlock(42, 0),
			11: new BaseBlock(98, 0),
			12: new BaseBlock(139, 0),	
			13: new BaseBlock(19, 0)	
		};
	}
	var fieldMin = vec.add(-xSize/2, 0, -zSize/2);
	var startTime = new Date();

	if (checkFlag("c"))
		mineBlocks[10] = new BaseBlock(20, 0);
	
	var mines = [];
	
	var arrayWidth = xSize;
	var arrayHeight = zSize;
	
	var mines = new Array(xSize)				//array to hold mine positions
	for (var x = 0; x < xSize; x++) {
		mines[x] = new Array(zSize);
		for (var z = 0; z < zSize; z++) {
			mines[x][z] = 0;
		}
	}
	
	var legendPos = vec.add(xSize/2+4, 1, -4);
	for(var inc = 0; inc < 9; inc++) {
		session.setBlock(legendPos.add(0,0,inc), mineBlocks[inc]);
	}
	session.setBlock(legendPos.add(0,0,-1), mineBlocks[13]);
	session.setBlock(legendPos.add(0,0,9), mineBlocks[9]);
	
	for (x = -1; x < xSize+1; x++) {					//Creating the base minefield
		for (z = -1; z < zSize+1; z++) {
			var pos = vec.add(x - xSize/2, 0, z - zSize/2);
			session.setBlock(pos.add(0,-2,0), mineBlocks[11]);
			for(var y = 1; y < 11; y++) { session.setBlock(pos.add(0,y,0), new BaseBlock(0)); }		//clear some space above
			
			if((x == -1) || (x == xSize) || (z == -1) || (z == zSize)) {		//Walls and perimeter
				session.setBlock(pos, mineBlocks[11]);							//Underground stone brick layers
				session.setBlock(pos.add(0,-1,0), mineBlocks[11]);
				
				if((x == parseInt(xSize/2)) || (z == parseInt(zSize/2))) { continue; }
				
				if ((xSize%2) == 1) {
					if (x == xSize/2) { continue; }
				}
				else {
					if (x == xSize/2) { continue; }
					if (x+1 == xSize/2) { continue; }
				}
				
				if ((zSize%2) == 1) {
					if (z == zSize/2) { continue; }
				}
				else {
					if (z == zSize/2) { continue; }
					if (z+1 == zSize/2) { continue; }
				}
				
				
				
				session.setBlock(pos.add(0,1,0), mineBlocks[12]);
			}	
			else {															//Center Area
				session.setBlock(pos, mineBlocks[10]);
			}
			
		}
	}
	
	var missCnt = 0;
	for (m = 0; m < mineTotal; m += 0) {			//Setting the mines
	
		var x = parseInt(Math.random()*xSize);
		var z = parseInt(Math.random()*zSize);
		
		//player.print("x@" + x + "| z@" + z);
		
		var pos = fieldMin.add(x, 0, z);
		//var pos = vec.add(parseInt(x - size/2), 0, parseInt(z - size/2));
		//player.print("pos@" + pos);
		
		
		missCnt++;
		if (mines[x][z] == 0) {			
			session.setBlock(pos.add(0,-1,0), mineBlocks[9]);
			//player.print("mine set @" + pos + mineBlocks[9]);
			mines[x][z] = 1;
			m++;
			missCnt = 0;
		}
		
		if(missCnt > 1000) {
			player.print("I couldn't find anymore spots to put mines!");
			player.print("I found room for a total of " + m + " mines.");
			m = mineTotal;
			missCnt = 0;
		}
	}

	player.print(text.Gold + "Finished creating minefield!");
	player.print(text.Gold + mineTotal + text.White + " mines set in a " + text.Gold + xSize + " x " + zSize + text.White + " area - " + text.Gold + (m/(xSize*zSize)*100).toFixed(1) + text.White + "% density.");

	for (x = 0; x < xSize; x++) {					//Setting color blocks
		for (z = 0; z < zSize; z++) {
			
			pos = vec.add(x - xSize/2, -1, z - zSize/2);
			
			//if (session.getBlock(pos) == mineBlocks[10]) {
			
			if (mines[x][z] == 0) {
			
				var areaMines = 0;
				
				for (px = -1; px <= 1; px++) {					//Looping thru neighbor blocks
					for (pz = -1; pz <= 1; pz++) {
						posX = x + px;
						posZ = z + pz;
						
						if((posX < 0) || (posX >= xSize) || (posZ < 0) || (posZ >= zSize)	) {continue;}
						
						if (mines[posX][posZ] == 1)
							areaMines++;
					
					
					}
				}
				
				session.setBlock(pos, mineBlocks[areaMines]);
		
			}
		
		}
	}

	var sweeperTool = new DoubleActionTraceTool({			//Creating the sweeper tool
		canUse : function(player) {
			return player.hasPermission("worldedit.tool.wand");
		},
		actSecondary : function(server,config,player,session) {			// ###### Left Click - Clear Block
		
			try {
				var vec = player.getBlockTrace(200, false);
				if (vec == null) { return; }
				
				var es = session.createEditSession(player);
				
				if (es.getBlock(vec).equals(mineBlocks[10])) {			//check if the surface block was clicked
					var es = session.createEditSession(player);
					var testBlock = es.getBlock(vec.add(0,-1,0));
					es.setBlock(vec.add(0,0,0), testBlock);				
					
					if (testBlock.equals(mineBlocks[0])) {			//if mine count is zero attempt to expand area
						
						var expandList = [];
						var expandSide = [];
						
						expandList.push(vec.add(0,-1,0)); 
						
						for (var inc = 0;  inc < expandList.length; inc++) {
							
							for(var side in offsetList) {		//check all the sides for more open areas, if found push them to be checked also
								if (es.getBlock(expandList[inc].add(offsetList[side])).equals(mineBlocks[0]) && es.getBlock(expandList[inc].add(offsetList[side].add(0,1,0))).equals(mineBlocks[10])) {
									if (String(expandList).indexOf(String(expandList[inc].add(offsetList[side]))) == -1) {
										expandList.push(expandList[inc].add(offsetList[side])); 
									}								
								}
							}
							
							if(inc > 500000) {			//check to see if the expanding gets too far out of control
								player.print("inc over 500,000!");
								player.print("length=" + expandList.length);
								session.remember(es);
								return;
							}
							
							es.setBlock(expandList[inc].add(0,1,0), mineBlocks[0]);
							
							for(var side in offsetList) {		//open up all the blocks around clear area
								if (es.getBlock(expandList[inc].add(offsetList[side].add(0,1,0))).equals(mineBlocks[10]))
									expandSide.push(expandList[inc].add(offsetList[side].add(0,1,0)));
							}
						}
						
						for (var inc in expandSide) {
							es.setBlock(expandSide[inc], es.getBlock(expandSide[inc].add(0,-1,0)));
						}
					}
				}
				
				else{													//check if a numbered block was clicked
					var tCnt = 0;
					for (var tInc = 1; tInc < 10; tInc++) {
						if (es.getBlock(vec).equals(mineBlocks[tInc]))		
							tCnt = tInc;
					
					}
				}
				
				if (tCnt > 0) {				//if a numbered block was found
					
					var flagCnt = 0;
					
					for (var side in offsetList) {		//open up all the blocks around clear area
						if (es.getBlock(vec.add(offsetList[side])).equals(mineBlocks[13]))
							flagCnt++;
					
					}
					
					if(flagCnt >= tCnt) {
						for(var side in offsetList) {		//open up all the blocks around clear area
							
							if (!es.getBlock(vec.add(offsetList[side])).equals(mineBlocks[13]))	 {
								es.setBlock(vec.add(offsetList[side]), es.getBlock(vec.add(offsetList[side].add(0,-1,0))));
							}
							
							var testVec = vec.add(offsetList[side].add(0,-1,0));
							var testBlock = es.getBlock(testVec);			
							
							if (testBlock.equals(mineBlocks[0])) {			//if mine count is zero attempt to expand area
								
								var expandList = [];
								var expandSide = [];
								
								expandList.push(testVec); 
								
								for (var inc = 0;  inc < expandList.length; inc++) {									
									
									for(var side in offsetList) {		//check all the sides for more open areas, if found push them to be checked also
										if (es.getBlock(expandList[inc].add(offsetList[side])).equals(mineBlocks[0]) && es.getBlock(expandList[inc].add(offsetList[side].add(0,1,0))).equals(mineBlocks[10])) {
											if (String(expandList).indexOf(String(expandList[inc].add(offsetList[side]))) == -1) {
												expandList.push(expandList[inc].add(offsetList[side])); 
											}								
										}
									}
									
									if(inc > 500000) {			//check to see if the expanding gets too far out of control
										player.print("inc over 500,000!");
										player.print("length=" + expandList.length);
										return;
									}
									
									for(var side in offsetList) {		//open up all the blocks around clear area
										if (es.getBlock(expandList[inc].add(offsetList[side].add(0,1,0))).equals(mineBlocks[10]))
											expandSide.push(expandList[inc].add(offsetList[side].add(0,1,0)));
									}

								}
								
								for (var inc in expandSide) {
									es.setBlock(expandSide[inc], es.getBlock(expandSide[inc].add(0,-1,0)));
								
								}
							}							
						}
					}
				}
				
				var tntList = [];
				var leftCnt = 0;	//surface block count
				//var fCnt = 0;	//flag count
				for (var x = 0; x < xSize; x++) {					//Checking for TNT or game win
					for (var z = 0; z < zSize; z++) {
						var pos = fieldMin.add(x, 0, z);
						
						if (es.getBlock(pos).equals(mineBlocks[10])) { leftCnt++; }
						if (es.getBlock(pos).equals(mineBlocks[13])) { leftCnt++; }
						
						if (es.getBlock(pos).equals(mineBlocks[9])) {					//TNT was hit
							for (var xT = 0; xT < xSize; xT++) {					
								for (var zT = 0; zT < zSize; zT++) {
									var posT = fieldMin.add(xT, -1, zT);
									if (es.getBlock(posT).equals(mineBlocks[9])) {
										es.setBlock(posT.add(0,1,0), mineBlocks[9]);
										if (checkFlag("h"))	
											es.setBlock(posT.add(0,0,0), new BaseBlock(76));
									}
									
								}
							}
							
							player.print("\n" + text.Red + text.Bold + "BOOOOOOM!!!!" + text.White + " You hit TNT, and are now dead. Better luck next time!");
							session.setTool(player.getItemInHand(), null)
							return;
						}
					}
				}	
				
				if(leftCnt == mineTotal) {
				
					var totalTime = (new Date() - startTime)/1000;
					player.print("\n" + text.Gold + text.Bold + "-------- You Win!! --------");
					player.print(text.White + "You cleared " + text.Gold + mineTotal + text.White + " mines from a " + text.Gold + xSize + " x " + zSize + text.White + " area in " + text.Gold + totalTime.toFixed(1) + text.White + " secs!");
					
					var diamonds = new BaseItemStack(264, 1);
					for (var xT = 0; xT < xSize; xT++) {					
						for (var zT = 0; zT < zSize; zT++) {
							var posT = fieldMin.add(xT, -1, zT);
							if (es.getBlock(posT).equals(mineBlocks[9])) {
								es.setBlock(posT.add(0,1,0), mineBlocks[9]);
								player.getWorld().dropItem(posT.add(0,30,0), diamonds, 1);
							}
							
						}
					}
					
					session.setTool(player.getItemInHand(), null)
					return;

				}
				
			}
			catch (e) {
				player.print("error=" + e);
			}
			
			return;
		},
		
		actPrimary : function(server,config,player,session) {			// ###### Right Click - Set Marker
			
			try {
				var vec = player.getBlockTrace(200, false);
				if (vec == null) { return; }
				var es = session.createEditSession(player);
				
				if (es.getBlock(vec).equals(mineBlocks[10])) {			//Set Flag
					es.setBlock(vec.add(0,0,0), mineBlocks[13]);
				}
				else if (es.getBlock(vec).equals(mineBlocks[13])) {		//Remove Flag
					es.setBlock(vec.add(0,0,0), mineBlocks[10]);
				}
				else {
					
					var flagCnt = 0;
					for (var x = 0; x < xSize; x++) {					//Checking for flags
						for (var z = 0; z < zSize; z++) {
							var pos = fieldMin.add(x, 0, z);
							
							if (es.getBlock(pos).equals(mineBlocks[13])) { flagCnt++; }
							
						}
					}
					var totalTime = (new Date() - startTime)/1000;
					player.print(text.White + "Mines Left: " + text.Gold + (mineTotal-flagCnt) + text.White + "  Current Time: " + text.Gold + totalTime.toFixed(1) + text.White + " secs.");
				
				}
				
			}
			catch (e) {
				player.print("error=" + e);
			
			}				
				
			return;

		},	
	});
	
	context.getSession().setTool(player.getItemInHand(), sweeperTool);
	
}

function BuildFloodFill (vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	try {
		if (vecList.length == 0) { return false; }

		var size = checkFlag("s") ? parseInt(checkFlag("s")) : 15;
		var replBlock = checkFlag("b") ? parseBlock(checkFlag("b")) : new BaseBlock(0, 0);
		var gapSize = checkFlag("g") ? parseInt(checkFlag("g")) : 1;
		var mat = (gMat == airMat) ? new SingleBlockPattern(replBlock) : gMat;
		
		size = gSize != -1 ? gSize : size;
		var vec = player.getBlockTrace(200);
		
		var offsetList = [];
		var expandList = [];

		var findBlock = getBlock(vec);
		if (findBlock.getType() < 1) { return; }
		if (findBlock.getType() == mat.next(vec).getType()) {
			player.print("Block to fill can't be the same as the replacement.");
			return;
		}
		
		if (gapSize != 0) {		//generate point list around center block;
			for (var x = -gapSize; x <= gapSize; x++) {
				for (var y = -gapSize; y <= gapSize; y++) {
					for (var z = -gapSize; z <= gapSize; z++) {
						offsetList.push(Vector(x, y, z));
					}
				}
			}
		}
		else {
			offsetList = {	//check only on the faces of the center block
				0: Vector(1,0,0),
				1: Vector(-1,0,0),
				2: Vector(0,0,1),
				3: Vector(0,0,-1),
				4: Vector(0,1,0),
				5: Vector(0,-1,0)
			};
		}

		expandList.push(vec);
		setBlock(vec, mat);
		
		maskSet = (brushTool.getMask() == null && session.getMask() == null) ? false : true;
		
		for (var inc = 0;  inc < expandList.length; inc++) {

			for(var side in offsetList) {		//check all the sides for more open areas, if found push them to be checked also
				
				distance = getDistance(vec, expandList[inc].add(offsetList[side]));
				if ( distance > size/2) { continue;	}
			
				if (maskSet == false) {
					if (getBlock(expandList[inc].add(offsetList[side])).getType() == findBlock.getType()) {
						expandList.push(expandList[inc].add(offsetList[side])); 
						setBlock(expandList[inc].add(offsetList[side]), mat);
					}
				}
				else {					//check all the sides for more open areas, if found push them to be checked also
					if (getBlock(expandList[inc].add(offsetList[side])).getType() == findBlock.getType()) {
						if (expandList.indexOf(expandList[inc].add(offsetList[side])) == -1) {
							expandList.push(expandList[inc].add(offsetList[side])); 
							setBlock(expandList[inc].add(offsetList[side]), mat);
						}								
					}
				}
			}
			
			if(inc > 10000 && distance < 7) {
				player.print("Infinite loop detected!");
				player.print("Stopping after " + expandList.length);
				break;
			}
			
			if(inc > 1000000) {			//check to see if the expanding gets too far out of control
				player.print("Inc past max limit!");
				player.print("Length = " + expandList.length);
				break;
			}
		}
		context.getSession().remember(session)
		
	}
	catch(e) {
		print("Error in Flood: " + e);
	
	}
}

function BuildRandom(vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;

	if (vecList.length == 0) { return false; }
	
	var vec = checkFlag("~") ? player.getBlockTrace(parseInt(checkFlag("~")), true) : player.getSolidBlockTrace(200);
	if (vec == null)	return
	try {
		var rngType = checkFlag("t") ? parseInt(checkFlag("t")) : 3;
		var maxCnt = checkFlag("m") ? parseInt(checkFlag("m")) :  10000;
		var block = checkFlag("b") ? parseBlock(checkFlag("b")) :  new BaseBlock(1);
		var replaceBlock = checkFlag("r") ? parseBlock(checkFlag("r")) :  null;
		var xStretch = checkFlag("x") ? parseInt(checkFlag("x")) : 1;
		var yStretch = checkFlag("y") ? parseInt(checkFlag("y")) : 1;
		var zStretch = checkFlag("z") ? parseInt(checkFlag("z")) : 1;
		CreateRandom(vec, rngType, block, replaceBlock, maxCnt, xStretch, yStretch, zStretch );
		return;
	}
	catch(e) {
		printError("BuildRandom", e);
	}
}

function BuildHandOfGod (vec) {
	this.name =  "Flood Fill";	
	this.note = "Creates a block based flood filling tool.";
	this.keys = ["flood", "flooder", "floodfill"];
	this.args = {
		0 : { 
			name: "size", 
			note: "Brush size",
			flag: "s",
			type: "value", 
			defArg: 15,
			min: 0,
			max: 500
		},
		1 : { 
			name: "block",
			note: "Brush block to use",
			flag: "b",
			type: "block",
			defArg: 0
		},
		2 : {
			name: "gap",
			note: "Allowed gap between flood blocks",
			flag: "g",
			type: "value",
			defArg: 15,
			min: 0,
			max: 10 
		}
	};
	this.visible = 1;
	this.runCnt = 0;
	//this.checkArgs = function(flag) {return checkToolArgs(this, flag);};
	this.initialize = function (vec) {				//initialize when the initial command is given
		print(this.name + " start function.");
		this.checkArgs(null);
		this.runCnt++;
		return;
	};
	this.main = function (vec) {					//run each time the user clicks the brush
		print(this.name + " run function.");
		return;
	};

	//return this;
	if (vecList.length < 1) return;

	try {
		// ### SPC Testing
			var spcSetup = JavaImporter(Packages.com.sijobe.spc.worldedit, Packages.com.sijobe.spc.wrapper, Packages.com.sijobe.spc.command);

			var spcPlayer = MinecraftServer.getPlayerByUsername(player.getName());
			var worldBase = spcPlayer.getWorld().getMinecraftWorld();
			var world = com.sijobe.spc.wrapper.World(worldBase);
			world.setTime(6000);
			
			// var radius = 5;
			// var killList = [];
			// killList = Entity.killEntities("mob", new Coordinate(vec.getX(), vec.getY(), vec.getZ()), world, radius);

			spcPlayer.getWorld().useLightning(new Coordinate(vec.getX(), vec.getY(), vec.getZ()));
			spcPlayer.getWorld().createExplosion(spcPlayer, new Coordinate(vec.getX(), vec.getY(), vec.getZ()), 20)
			
			//var tntEnt= new Entity();
			//sleep(1000);
			//tntEnt.spawnEntity("Zombie", new Coordinate(vec.getX(), vec.getY(), vec.getZ()),spcPlayer.getWorld()); 

			//tntEnt.spawnEntity("PrimedTNT", new Coordinate(vec.getX(), vec.getY(), vec.getZ()),spcPlayer.getWorld()); 
			
			
			// var accel = 8;
			// var mcID = Minecraft;
			// var spcPlayer = mcID.getPlayer();
			// var motion = spcPlayer.getMotion();
			// spcPlayer.setMotion( new Coordinate(motion.getX()*accel,motion.getY()*accel,motion.getZ()*accel));			//set player motion - good

	}
	catch(e) {
		printError("HandOfGod", e);
		return;
	}
	finally {
		return;
	}
}

function BuildWindows(vec) {
	//var testFrame3 = new BaseFrame("The frame that has no name!? Say What!", 'gold');
	//testFrame3.initialize();

	//$debug.initialize();

	//var tmpArg = checkFlag("#", 0);
	//printDebug("tmpArg", tmpArg);
	
	$debug = $debug.reload();
	//$map = $map.reload();
	$textBuilder = $textBuilder.reload();	
	//return;
	
	switch (checkFlag("#")) {

		case ("debug"):
			$debug = $debug.reload();
			break;
		case ("input"):
			$input = $input.reload();
			break;
		case ("map"):
			$map = $map.reload();
			break;
		case("show"):
			$debug.show();
			$map.show();
			break;
		case (true):
			//$debug = $debug.reload();
			//$map = $map.reload();
			$input = $input.reload();
			break;
		default:

	}
	
	
}

function BuildBlender(vec) {
	if (vecList.length == 0) { return false; }

	var blenderTool = new DoubleActionTraceTool({			//Creating the sweeper tool
		canUse : function(player) {
			return player.hasPermission("worldedit.tool.wand");
		},
		actSecondary : function(server,config,player,session) {			// ###### Left Click - Erode Brush
		
			try {
				var es = session.createEditSession(player);
				vec = getTarget().vec;
				if (vec == null) { return; }
				
				if (tools[mode].name == "Erode") { BuildFill(vec, es); }	
				else { BuildErode(vec, es); }
				session.remember(es);
			}
			catch (e) {
				player.print("error=" + e);
			}
			return;
		},
		
		actPrimary : function(server,config,player,session) {			// ###### Right Click - Fill Brush
			try {
				var es = session.createEditSession(player);
				vec = getTarget().vec;
				if (vec == null) { return;	}
				
				if (tools[mode].name == "Fill") { BuildFill(vec, es); }	
				else { BuildErode(vec, es); }
				session.remember(es);
			}
			catch (e) {
				player.print("error=" + e);
			
			}				
			return;

		},	
	});

	context.getSession().setTool(player.getItemInHand(), blenderTool);

}


//////////////////////////////////////////////////////////
//				Build Testing Area
//////////////////////////////////////////////////////////


function BuildTest(vec) {
	
	try{
		
		
		
		var mcWrapper = function mcWrapper() {
			this.world = null;
			this.server = null;
			this.player = null;
			
			mcWrapper.prototype.initialize = function initialize() {
				
				if ($spc != false) {
					this.world = $spc
					this.world = $spc
					this.world = $spc				
				}
			};
			
			mcWrapper.prototype.displayGUIEditSign = function displayGUIEditSign(vec, searchSize) {
				
				this.player.a(tile);  // opens the sign gui screen from a tile entity
				tile.a = ["It", "actually", "worked", "wow"]; //setting sign text on tile entity; doesn't update till chuck reload
			};
			
			mcWrapper.prototype.setSignText = function setSignText(vec, txtAr) {
			
				$spc.worldMC				
			
			};
			
			this.initialize();
		}		
		
		
		//$map.initialize();
		
		//delayAction( function() { player.print("why hello there") }, null, 3000);
		
		if (vecList.length < 1) return;
	
		
		var vec = getTarget().vec.add(0,1,0);
		vec = Vector(Math.floor(vec.x)+.5, Math.floor(vec.y)+.5, Math.floor(vec.z)+.5);
		var side = [new Vector(-1,0,0), new Vector(1,0,0), new Vector(0,-1,0), new Vector(0,1,0), new Vector(0,0,-1), new Vector(0,0,1)]
		var bb = new BaseBlock(22);
		var cc = new BaseBlock(0);
		
		
		//var yMax = session.getHighestTerrainBlock(vec.getX(),vec.getZ(), 0, 256, false);
		//var topVec = Vector(gameVec.getX(), yMax, gameVec.getZ());
		
		printDebug("vec", vec);
		//return;
		
		var randomMover = new repeatAction( function() {
			if (typeof this.start == 'undefined') {
				this.start = vec;
				this.distance = 0;
				this.vec = vec;
				this.block = bb;
				this.saved = cc;
				this.cnt = 0;
				this.max = 200;
				this.extend = 0;
				this.side = 0;
				this.maxLength = 2;
				this.maxTries = 100;
				this.path = [];
				this.traceMax = 10;
				this.trace = 0;
			}
			else {
				this.main();
				return;			
			}
			
			this.main = function main() {
				try {
					this.cnt++;
					if (typeof this.max == 'undefined' || this.cnt > this.max || typeof this.vec == 'undefined') {
						player.print("Max limit reached: " + this.max);
						this.cancel();
						return;
					}
					
					var lp = 0;
					do {
						var tmpSide = side[Math.floor(Math.random()*side.length)];
						var tmpVec = this.vec.add(tmpSide);
						var tmpBlock = getBlock(tmpVec);
						var tmpUnder = getBlock((tmpVec.add(0,-1,0)));
						var tmpDistance = getDistance(tmpVec, this.start);

						if (this.trace > 0) {
							printDebug("this.trace", this.trace);
							this.extend = 0;
							this.trace--;
							var tmpTrace = Math.max((this.path.length - (this.traceMax-this.trace)), 0);
							tmpBlock = getBlock(this.path[tmpTrace]);
							var tmpVec = this.path[tmpTrace];
						}
						else if (this.extend > 0) {
							tmpSide = this.side;
							this.extend--;
						}
						
						//printDebug("tmpBlock ", tmpBlock );
						//printDebug("tmpUnder", tmpUnder);
						var skip = false;
						if (tmpDistance < this.distance) {
							//printDebug("tmpDistance", tmpDistance);
							skip = (lp / this.maxTries) > 1 ? false : true;
							//printDebug("lp / this.maxTries", lp / this.maxTries);
						}
						
						
						//else {
						//	printDebug("lp ", lp );
						//}					
						
						if (lp >= this.maxTries) {
							player.print("I'm stuck at " + tmpVec + " - Stopping");
							this.trace = 10;
							return;
						}
						
						lp++;
					} while(tmpBlock.id != 0 || tmpUnder.id == 0 || tmpUnder.id == this.block.id || skip == true)
					this.distance = tmpDistance;
					printDebug("this.distance", this.distance);
					if (this.trace == 0) this.path.push(tmpVec);
					setBlock(this.vec, this.saved)
					//if (this.side != tmpSide) this.extend = this.maxLength-1;
					this.vec = tmpVec
					this.saved = tmpBlock;
					this.side = tmpSide;
					setBlock(tmpVec, this.block);
				}
				catch (e) {
					printError("randomMover", e);
					this.cancel();
				}
			}
		}, null, 100, 100);
		
		return;
		
		
		
		//print(searchObject(player, 3, "DOWN"));
		//return;
		
		
		//org.mozilla.javascript.Context.getCurrentContext().getFactory().enterContext();
		//var tmpVec;
		//printDebug("java.lang.Thread.currentThread()", java.lang.Thread.currentThread());
		//return;
		

		

		/* ### Minecraft internal function and NBT Testing */
		
		var timeStart = new Date().getTime();
		//for (var qwerty = 0 ; qwerty < 100000; qwerty++) {
			//player.print("ID = " + getFastBlockID(vec.add(0,0,0)));
			//player.print("Data = " + getFastBlockData(vec.add(0,0,0)));
			//var tblk = getBlock(vec).ID;
			//var tbb = $spc.world.getBlockId(com.sijobe.spc.wrapper.Coordinate(vec.getX(), vec.getY(), vec.getZ()))
			
			// mc.d = is block a tile entity? (int,int,int);
			// mc.g = block material type? maybe the chunk?
			// mc.h = block metadata
			// mc.i = set to air
			// mc.l = block is a chest?
			// mc.m = something, no idea
			// mc.r = tile entity data! maybe... it is!
			
			
			
			var tile = ($spc.worldMC.r(java.lang.Integer(vec.getX()), java.lang.Integer(vec.getY()), java.lang.Integer(vec.getZ())));
			
			//tile.a(String("The precious"));			// set tile entity display name
			//printDebug("tile", ObjToStr(tile));
			//printDebug("printObject(tile, 2)", printObject(tile.class.methods[1], 3));
			
			var nbt = net.minecraft.src.NBTTagCompound; //("Text1");
			var nbt2 = tile;
			//var nbt3 =  nbt2.c;
			stage = tile;
			//var nbt4 = nbt3.toString();
			//printDebug("$spc.worldMC", $spc.worldMC);
			//printDebug("nbt", ObjToStr(nbt));
			
		
			//$spc.worldMC.a(new java.lang.String("lava"), new java.lang.Double(String(vec.getX())), new java.lang.Double(String(vec.getY()+3)), new java.lang.Double(String(vec.getZ())), new java.lang.Double(String("0")), new java.lang.Double(String("1")), new java.lang.Double(String("0")));
			//var tid = getFastBlockID(vec);
			//var tdata = ("Data = " + getFastBlockData(vec.add(0,0,0)));
	
		$spc.player.addPotionEffect(1 ,5 * 20, 5);
		
		//printDebug("tmpMe.moveForwardField", ObjToStr(tmpMe.getClass().getCanonicalName()));
		//mpMe.getClass.method[1]();
		
		//printDebug("tmpMe", printObject(tmpMe, 2));
		//tmpMe.displayGUIChest($spc.player.getInventoryEnderChest());
		//printDebug("tile", tile.getClass().getFields()[0]);
		//printDebug("tile", ObjToStr(tile.a));
		
		

		printDebug("tile.a", tile.a[0]);
		return;
		
		tile.b();
		//tile.c();
		//tile.d();
		tile.e();
		tile.i();
		tile.h();
		tile.s();
		tile.w_();
		//tile.j();
		//tile.k();
		printDebug("tile.getClass().getMethods()", ObjToStr(tile.getClass().getMethods()));
		//player.print("Total Time = " + (new Date().getTime()- timeStart));
		//printDebug("tile.a ", tile.a[0]]); 
		
		

		return;
		
		BuildRandom(vec);
		
	}
	catch(e) {
		if (e.javaException) print("Test Error(Java): = {" + e.javaException + "}");
		if (e.rhinoException) print("Test Error(Rhino): = {" + e.rhinoException + "}");
		return;
	}

};

function printObject(obj, maxDepth, prefix){
	var result = '';
	if (!prefix) prefix='';
		for(var key in obj){
		if (typeof obj[key] == 'object'){
			if (maxDepth !== undefined && maxDepth <= 1){
				result += (prefix + key + '=object [max depth reached]\n');
			} else {
				result += printObject(obj[key], (maxDepth) ? maxDepth - 1: maxDepth, prefix + key + '.');
			}
		} else {
			result += (prefix + key + '=' + obj[key] + '\n');
		}
	}
	return result;
}

function searchObject(obj, maxDepth, findStr){
	var result = '';
	for(var key in obj){
		if (typeof obj[key] == 'object'){
			if (maxDepth !== undefined && maxDepth <= 1){
				//result += (prefix + key + '=object [max depth reached]\n');
			} else {
				if (String(obj[key]).indexOf(findStr) != -1) {
					result += searchObject(obj[key], (maxDepth) ? maxDepth - 1: maxDepth, findStr);
				}
				else {
					var retVal = searchObject(obj[key], (maxDepth) ? maxDepth - 1: maxDepth, findStr);
					if (String(retVal).indexOf(findStr) != -1) result += retVal;
				}
			}
		} else {
			if(String(obj[key]).indexOf(findStr) != -1) result += (key + '=' + obj[key] + '\n'); 
		}
	}
	return result;
}

function delayAction(runFunction, argVars, startDelay) {
	try {
		argVars = typeof argVars == 'undefined' ? null: argVars;
		startDelay = typeof startDelay == 'undefined' ? 1 : parseInt(startDelay);
		repeatDelay  = typeof repeatDelay == 'undefined' ? null : parseInt(repeatDelay);
				
		var pointerFunction = runFunction;
		var delayTask = new TimerTask() {
			argList: argVars,
			pointer: pointerFunction,
			run : function() {
				try {
					if (this.argList != null && typeof this.argList != 'undefined') this.pointer(this.argList);
					else this.pointer();

				}
				catch(e) {
					printError("Delayed Task", e);
					throw (e);
				}
				finally {
					this.cancel();
				}
			}
		}
		var timer = new Timer();
		timer.schedule(delayTask, startDelay);
		timer = null;
	}
	catch(e) {
		printError("Delayed Function", e);
	}
}

function repeatAction(runFunction, argVars, startDelay, repeatDelay) {
	try {
		argVars = typeof argVars == 'undefined' ? null: argVars;
		startDelay = typeof startDelay == 'undefined' ? 1 : parseInt(startDelay);
		repeatDelay  = typeof repeatDelay == 'undefined' ? null : parseInt(repeatDelay);
				
		var pointerFunction = runFunction;
		var delayTask = new TimerTask() {
			argList: argVars,
			
			pointer: pointerFunction,
			run : function() {
				try {
					if (this.argList != null && typeof this.argList != 'undefined') this.pointer(this.argList);
					else this.pointer();
				}
				catch(e) {
					printError("Delayed Task", e);
					throw (e);
				}
				finally {
				}
			}
		}
		
		var timer = new Timer();
		timer.schedule(delayTask, startDelay, repeatDelay);
		timer = null;
	}
	catch(e) {
		printError("Delayed Function", e);
	}
}

function runJScript(jStr, globalObj) {
//evaluate a javascript string with a local scope obj
	try {
		//var file = context.getSafeFile("craftscripts", "build.js");		//load javascript from external file
		//jStr = loadFile(file, 2);
		
		globalObj = globalObj ? globalObj : global;
		var cx = Context.getCurrentContext();
		var newScope = cx.initStandardObjects(globalObj);
		//Context.exit();
		return (cx.evaluateString(newScope, jStr, "bcSubScript", 1, null));
		
	}
	catch(e) {
		printError("jScript", e);
	}
}

function ObjSize(object) {
	// Created by the user tomwrong from http://stackoverflow.com/questions/1248302/javascript-object-size
	
    var objectList = [];
    var stack = [ object ];
    var bytes = 0;

    while ( stack.length ) {
        var value = stack.pop();

        if ( typeof value === 'boolean' ) {
            bytes += 4;
        }
        else if ( typeof value === 'string' ) {
            bytes += value.length * 2;
        }
        else if ( typeof value === 'number' ) {
            bytes += 8;
        }
        else if
        (
            typeof value === 'object'
            && objectList.indexOf( value ) === -1
        )
        {
            objectList.push( value );

            for( i in value ) {
                stack.push( value[ i ] );
            }
        }
    }
    return bytes;
}





// BOTTOM GAP

