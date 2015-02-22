//Made by Robert Snead
//http://forum.enginehub.org/threads/sidewalls-js.9716/ 
importPackage(Packages.java.io);
importPackage(Packages.java.awt);
importPackage(Packages.com.sk89q.worldedit);
importPackage(Packages.com.sk89q.worldedit.blocks);
 
context.checkArgs(5, 5, "block<BlockName or BlockID> northWall<0=no,1=yes> southWall<0=no,1=yes> eastWall<0=no,1=yes> westWall<0=no,1=yes>");
 
var blocktype = context.getBlock(argv[1]);
var northWall = parseInt(argv[2]);
if (northWall == 1) {
  //do nothing
} else {
  northWall = 0;
}
//player.print("n:" + northWall + "");
var southWall = parseInt(argv[3]);
if (southWall == 1) {
  //do nothing
} else {
  southWall = 0;
}
//player.print("s:" + southWall + "");
var eastWall = parseInt(argv[4]);
if (eastWall == 1) {
  //do nothing
} else {
  eastWall = 0;
}
//player.print("e:" + eastWall + "");
var westWall = parseInt(argv[5]);
if (westWall == 1) {
  //do nothing
} else {
  westWall = 0;
}
//player.print("w:" + westWall + "");
 
sidewalls();
 
function sidewalls() {
  var myWorld = context.remember();
  var session = context.getSession();
  var region = session.getRegion();
  var rWidth = region.getWidth();
  var rLength = region.getLength();
  var rHeight = region.getHeight();
  var rMinPtX = region.getMinimumPoint().getX();
  var rMaxPtX = region.getMaximumPoint().getX();
  var xStep = 0;
  if (rMaxPtX > rMinPtX) {
      xStep = 1;
  } if (rMaxPtX < rMinPtX) {
      xStep = -1;
  }
  var rMinPtY = region.getMinimumPoint().getY();
  var rMaxPtY = region.getMaximumPoint().getY();
  var yStep = 0;
  if (rMaxPtY > rMinPtY) {
      yStep = 1;
  } if (rMaxPtY < rMinPtY) {
      yStep = -1;
  }
  var rMinPtZ = region.getMinimumPoint().getZ();
  var rMaxPtZ = region.getMaximumPoint().getZ();
  var zStep = 0;
  if (rMaxPtZ > rMinPtZ) {
      zStep = 1;
  } if (rMaxPtZ < rMinPtZ) {
      zStep = -1;
  }
 
  var changedBlockCount = 0;
  var vexX = 0;
  var vexY = 0;
  var vexZ = 0;
 
  for (var y = 0; y<rHeight; y++) {
      for (var x = 0;  x<rWidth; x++) {
          for (var z = 0; z<rLength; z++) {
              vexX = rMinPtX+(xStep*x);
              vexY = rMinPtY+(yStep*y);
              vexZ = rMinPtZ+(zStep*z);         
              if (northWall == 1) {
                  if (vexZ == rMinPtZ) {
                    var vecEnd = new Vector(vexX,vexY,vexZ);
                    myWorld.setBlock(vecEnd, blocktype);
                    changedBlockCount++;
                  }
              }
              if (southWall == 1) {
                  if (vexZ == rMaxPtZ) {
                    var vecEnd = new Vector(vexX,vexY,vexZ);
                    myWorld.setBlock(vecEnd, blocktype);
                    changedBlockCount++;
                  }
              }
              if (westWall == 1) {
                  if (vexX == rMinPtX) {
                    var vecEnd = new Vector(vexX,vexY,vexZ);
                    myWorld.setBlock(vecEnd, blocktype);
                    changedBlockCount++;
                  }
              }
              if (eastWall == 1) {
                if (vexX == rMaxPtX) {
                    var vecEnd = new Vector(vexX,vexY,vexZ);
                    myWorld.setBlock(vecEnd, blocktype);
                    changedBlockCount++;
                  }
 
              }
          }
      }
  }
 
  //NE
  //var vec = new Vector(rMinPtX,rMinPtY,rMinPtZ);
  //myWorld.setBlock(vec, blocktype);
  //SE
  //vec = new Vector(rMinPtX,rMinPtY,rMaxPtZ);
  //myWorld.setBlock(vec, blocktype);
  //NW
  //vec = new Vector(rMaxPtX,rMinPtY,rMinPtZ);
  //myWorld.setBlock(vec, blocktype);
  //SW
  //vec = new Vector(rMaxPtX,rMinPtY,rMaxPtZ);
  //myWorld.setBlock(vec, blocktype);
 
 
player.print("" + changedBlockCount + " block(s) have been changed.");
}
