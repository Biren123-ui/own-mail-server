const SMTPServer = require("smtp-server").SMTPServer;
const server = new SMTPServer({
  allowInsecureAuth: true,
  authOptional: true,
  onConnect(session, cb) {
    console.log(`onConnect`, session.id);
    cb();
    //    cb(new Error("connot accept"))
  },
  onMailFrom(address, session, cb) {
    console.log(`onMailFrom`, address.address, session.id);
    cb();
  },
  onRcptTo(address, session, cb) {
    console.log(`onRCPTTO`, address.address, session.id);
    cb();
  },
  onData(stream, session, cb) {
    stream.on("data", (data) => {
      console.log(`onData ${data.toString()}`);
    });
    stream.on("end", cb);
  },
});
server.listen(25, () => {
  console.log(`server running on port number 25`);
});
