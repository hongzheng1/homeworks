const fs = require("fs");
const ws = fs.createWriteStream("demo.txt");
const rs = fs.createReadStream("demo.txt");

var writeBuff = Buffer.alloc(22);
writeBuff.writeUInt32BE(100, 0);
writeBuff.writeInt32BE(-100, 4);
writeBuff.writeUInt8(100, 8);
writeBuff.writeInt8(-100, 9);
writeBuff.writeFloatBE(88.88, 10);
writeBuff.writeDoubleBE(-888.888, 14);

var readBuff = [];

ws.end(writeBuff, function() {
	console.log("文件已导入!");
	rs.on("readable", function() {
		var data = rs.read();
		if(data) {
			readBuff.push(data);
		}
	});
	rs.on("end", function() {
		readBuff = Buffer.concat(readBuff);
		console.log("UInt32 = " + readBuff.readInt32BE(0));
		console.log("Int32 = " + readBuff.readInt32BE(4));
		console.log("UInt8 = " + readBuff.readUInt8(8));
		console.log("Int8 = " + readBuff.readInt8(9));
		console.log("Float = " + readBuff.readFloatBE(10));
		console.log("Double = " + readBuff.readDoubleBE(14));
	});
});