(this["webpackJsonpxamply.web"]=this["webpackJsonpxamply.web"]||[]).push([[0],{60:function(e,t,a){e.exports=a(96)},96:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),s=a(24),c=a.n(s),o=a(20),l=a(8),u=a(9),i=a(11),m=a(10),p=a(16),h=a(105),d=a(14),f=function(e){return{type:"LOGIN",payload:e}},E=function(){return{type:"LOGOUT",payload:{}}},b=a(97),g=a(98),v=a(99),y=a(116),O=a(117),w=a(118),j=a(100),C=a(57),x=a(101),N=a(102),k=a(103),S=a(104),U={backgroundColor:"#8EDBCC"},T=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).toggleNavbar=function(){n.setState({isOpen:!n.state.isOpen})},n.userButtons=function(){return null===n.props.currentUser?r.a.createElement(b.a,{className:"ml-auto",navbar:!0},r.a.createElement(g.a,null,r.a.createElement(v.a,{to:"/login",tag:o.c,activeClassName:"active"},"Login")),r.a.createElement(g.a,null,r.a.createElement(v.a,{to:"/register",tag:o.c,activeClassName:"active"},"Register"))):r.a.createElement(b.a,{className:"ml-auto",navbar:!0},r.a.createElement(y.a,{nav:!0,inNavbar:!0},r.a.createElement(O.a,{nav:!0,caret:!0},"Profile"),r.a.createElement(w.a,{right:!0},r.a.createElement(j.a,null,r.a.createElement(o.b,{to:"/profile",className:"dropdown-item"},"Profile")),r.a.createElement(j.a,{divider:!0}),r.a.createElement("div",{className:"dropdown-item"},r.a.createElement(C.a,{onClick:function(e){return n.logout(e)},className:"dropdown-item"},"Logout")))))},n.logout=function(){n.props.logout()},n.state={isOpen:!0},n}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(x.a,{style:U,light:!0,expand:"md",className:"sticky-top"},r.a.createElement(N.a,{to:"/",tag:o.b},"Xamply"),r.a.createElement(k.a,{onClick:this.toggleNavbar}),r.a.createElement(S.a,{isOpen:this.state.isOpen,navbar:!0},r.a.createElement(b.a,{className:"mr-auto",navbar:!0},r.a.createElement(g.a,null,r.a.createElement(v.a,{href:"https://github.com/reactstrap/reactstrap"},"Reactstrap GitHub"))),this.userButtons())))}}]),a}(r.a.Component),q=Object(d.b)((function(e,t){return{currentUser:e.currentUser,categories:e.categories}}),(function(e){return{logout:function(){return e(E())}}}))(T),P={backgroundColor:"#8EDBCC"},I=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("footer",{className:"footer fixed-bottom",style:P},r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col l6 s12"},r.a.createElement("h5",{className:"white-text"},"Footer Content"),r.a.createElement("p",{className:"grey-text text-lighten-4"},"\xa9 2014 Copyright Text")),r.a.createElement("div",{className:"col l4 offset-l2 s12"},r.a.createElement("h5",{className:"white-text"},"Links"),r.a.createElement("ul",null,r.a.createElement(o.b,{to:"/"},"Link 1"),r.a.createElement(o.b,{to:"/"},"Link 1"),r.a.createElement(o.b,{to:"/"},"Link 1"))))))}}]),a}(r.a.Component),L={height:"100vh"},D=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement(q,null),r.a.createElement(h.a,{style:L},this.props.children),r.a.createElement(I,null))}}]),a}(r.a.Component),R=a(15),A=a.n(R),_=a(21),M=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleInputChange=function(e){n.setState({questionCount:e.target.value})},n.renderCategories=function(){return 0===n.state.categories.length?r.a.createElement("div",null,"Loading"):r.a.createElement("div",{className:"row"},n.state.categories.map((function(e){return r.a.createElement("div",{key:e.id,className:"col s6"},r.a.createElement("div",{className:"card blue-grey darken-1"},r.a.createElement("div",{className:"card-content white-text"},r.a.createElement("span",{className:"card-title"},e.value),r.a.createElement("p",null,r.a.createElement("label",null,r.a.createElement("input",{name:"difficulty",type:"radio",className:"with-gap",value:"Easy"}),r.a.createElement("span",null,"Easy")),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("input",{name:"difficulty",type:"radio",className:"with-gap",value:"Medium"}),r.a.createElement("span",null,"Medium")),r.a.createElement("br",null),r.a.createElement("label",null,r.a.createElement("input",{name:"difficulty",type:"radio",className:"with-gap",value:"Hard"}),r.a.createElement("span",null,"Hard")))),r.a.createElement("div",{className:"card-action"},r.a.createElement("button",{onClick:function(t){return n.startExam(t,e.value)}},"Start test"))))})))},n.startExam=function(){var e=Object(_.a)(A.a.mark((function e(t,a){var r,s,c;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==n.props.currentUser){e.next=3;break}return n.props.history.push("/login"),e.abrupt("return");case 3:return r={questionCount:Number(n.state.questionCount),difficultyValue:document.querySelector("input[name=difficulty]:checked").value,categoryValue:a},e.next=6,fetch("https://localhost:44312/exams",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.props.currentUser.accessToken)},body:JSON.stringify(r)});case 6:if(200===(s=e.sent).status){e.next=9;break}return e.abrupt("return");case 9:return e.next=11,s.json();case 11:c=e.sent,n.props.history.push("/exam/".concat(c.data.examId));case 13:case"end":return e.stop()}}),e)})));return function(t,a){return e.apply(this,arguments)}}(),n.state={questionCount:1,categories:[]},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h1",{className:"center-align"},"Choose category:"),r.a.createElement("input",{onChange:function(t){return e.handleInputChange(t)},value:this.state.questionCount,name:"questionCount",type:"number",placeholder:"Enter question numbers:",className:"validate"}),this.renderCategories())}},{key:"componentDidMount",value:function(){var e=Object(_.a)(A.a.mark((function e(){var t;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(null!==this.props.currentUser){e.next=3;break}return this.props.history.push("/login"),e.abrupt("return");case 3:return e.next=5,fetch("https://localhost:44312/categories");case 5:return e.next=7,e.sent.json();case 7:t=e.sent,this.setState({categories:t.categories});case 9:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"componentDidUpdate",value:function(){null!==this.props.currentUser||this.props.history.push("/login")}}]),a}(r.a.Component),B=Object(d.b)((function(e,t){return{currentUser:e.currentUser}}),(function(e){return{}}))(M),Q=a(28),G=a(106),J=a(107),F=a(108),X=a(109),V=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleInputChange=function(e){n.setState(Object(Q.a)({},e.target.name,e.target.value))},n.handleLogin=function(){var e=Object(_.a)(A.a.mark((function e(t){var a,r,s;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={email:n.state.email,password:n.state.password},e.next=4,fetch("https://localhost:44312/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 4:if(r=e.sent,n.setState({email:"",password:""}),200===r.status){e.next=8;break}return e.abrupt("return");case 8:return e.next=10,r.json();case 10:s=e.sent,n.props.login(s.data),n.props.history.push("/");case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={email:"",password:""},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"text-center"},"Login:"),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement(G.a,{className:"col-md-4 col-sm-12",onSubmit:function(t){return e.handleLogin(t)}},r.a.createElement(J.a,null,r.a.createElement(F.a,{for:"email"},"Email"),r.a.createElement(X.a,{onChange:function(t){return e.handleInputChange(t)},value:this.state.email,type:"email",name:"email",id:"email",placeholder:"Email:"})),r.a.createElement(J.a,null,r.a.createElement(F.a,{for:"password"},"Password"),r.a.createElement(X.a,{onChange:function(t){return e.handleInputChange(t)},value:this.state.password,type:"password",name:"password",id:"password",placeholder:"Password:"})),r.a.createElement(C.a,null,"Login"),r.a.createElement("hr",null))))}},{key:"componentDidUpdate",value:function(){null===this.props.currentUser&&this.props.history.push("/login")}}]),a}(r.a.Component),z=Object(d.b)((function(e,t){return{}}),(function(e){return{login:function(t){return e(f(t))}}}))(V),H=a(115),Y=a(110),K=a(111),W=a(112),Z=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).toggleModal=function(){n.setState({modalToggle:!n.state.modalToggle})},n.handleInputChange=function(e){n.setState(Object(Q.a)({},e.target.name,e.target.value))},n.handleRegister=function(){var e=Object(_.a)(A.a.mark((function e(t){var a,r;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),a={email:n.state.email,password:n.state.password,confirmPassword:n.state.confirmPassword},e.next=4,fetch("https://localhost:44312/users/register",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)});case 4:if(r=e.sent,n.toggleModal(),n.setState({email:"",password:"",confirmPassword:""}),200===r.status){e.next=10;break}return n.setState({registerResult:"Register failed. Please enter correct username, password and confirm password."}),e.abrupt("return");case 10:n.setState({registerResult:"You have registered succesfully."});case 11:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.state={email:"",password:"",confirmPassword:"",registerResult:"",modalToggle:!1},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement("h2",{className:"text-center"},"Register:"),r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement(G.a,{className:"col-md-4 col-sm-12",onSubmit:function(t){return e.handleRegister(t)}},r.a.createElement(J.a,null,r.a.createElement(F.a,{for:"email"},"Email"),r.a.createElement(X.a,{onChange:function(t){return e.handleInputChange(t)},value:this.state.email,type:"email",name:"email",id:"email",placeholder:"Email:"})),r.a.createElement(J.a,null,r.a.createElement(F.a,{for:"password"},"Password"),r.a.createElement(X.a,{onChange:function(t){return e.handleInputChange(t)},value:this.state.password,type:"password",name:"password",id:"password",placeholder:"Password:"})),r.a.createElement(J.a,null,r.a.createElement(F.a,{for:"confirmPassword"},"Password"),r.a.createElement(X.a,{onChange:function(t){return e.handleInputChange(t)},value:this.state.confirmPassword,type:"password",name:"confirmPassword",id:"confirmPassword",placeholder:"Confirm password:"})),r.a.createElement(C.a,null,"Register"),r.a.createElement("hr",null))),r.a.createElement(H.a,{isOpen:this.state.modalToggle,toggle:this.toggleModal},r.a.createElement(Y.a,{toggle:this.toggleModal},"Modal title"),r.a.createElement(K.a,null,r.a.createElement("div",null,this.state.registerResult)),r.a.createElement(W.a,null,r.a.createElement(C.a,{color:"primary",onClick:this.toggleModal},"CTA"),r.a.createElement(C.a,{color:"secondary",onClick:this.toggleModal},"Cancel"))))}}]),a}(r.a.Component),$=Object(d.b)((function(e,t){return{}}),(function(e){return{}}))(Z),ee=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).showData=function(e,t){n.setState({data:t})},n.state={data:null},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12"},r.a.createElement("ul",{className:"tabs"},r.a.createElement("li",{className:"tab col s3"},r.a.createElement("button",{onClick:function(t){return e.showData(t,e.props.currentUser.id)}},"Id")),r.a.createElement("li",{className:"tab col s3"},r.a.createElement("button",{onClick:function(t){return e.showData(t,e.props.currentUser.email)},className:"active"},"Email")),r.a.createElement("li",{className:"tab col s3"},r.a.createElement("button",{onClick:function(t){return e.showData(t,e.props.currentUser.accessToken)}},"Access token")))),r.a.createElement("div",{className:"col s12"},this.state.data))}},{key:"componentDidUpdate",value:function(){null===this.props.currentUser&&this.props.history.push("/login")}}]),a}(r.a.Component),te=Object(d.b)((function(e,t){return{currentUser:e.currentUser}}),(function(e){return{}}))(ee),ae=a(113),ne=a(114),re=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this,t=this.props.question,a=t.value,n=t.answers;return r.a.createElement("div",{className:"row justify-content-center"},r.a.createElement("div",{className:"col-md-9 col-sm-12"},r.a.createElement("h2",{className:"text-center"},a),r.a.createElement(ae.a,null,n.map((function(t){return r.a.createElement(ne.a,{key:t.value},t.value," ",r.a.createElement("button",{onClick:function(a){return e.props.onAnswer(a,e.props.question.id,t.value)},className:"secondary-content"},"Choose"))})))))}}]),a}(r.a.Component),se=Object(d.b)((function(e,t){return{}}),(function(e){return{}}))(re),ce=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(l.a)(this,a),(n=t.call(this,e)).handleAnswer=function(){var e=Object(_.a)(A.a.mark((function e(t,a,r){var s,c,o,l,u;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n.state.answers.push({questionId:a,answerText:r}),s=n.state.exam.questions.indexOf(n.state.currentQuestion),console.log(s,n.state.exam.questionCount-1),s!==n.state.exam.questionCount-1){e.next=16;break}return c={examId:n.state.exam.id,answers:n.state.answers},e.next=7,fetch("https://localhost:44312/exams/finish",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(n.props.currentUser.accessToken)},body:JSON.stringify(c)});case 7:if(200===(o=e.sent).status){e.next=10;break}return e.abrupt("return");case 10:return e.next=12,o.json();case 12:return l=e.sent,n.props.history.push({pathname:"/examfinish",state:{questionCount:n.state.exam.questionCount,correctAnswers:l.data.correctAnswers}}),n.setState({exam:null,currentQuestion:null,answers:[]}),e.abrupt("return");case 16:u=s+1,n.setState({currentQuestion:n.state.exam.questions[u]});case 18:case"end":return e.stop()}}),e)})));return function(t,a,n){return e.apply(this,arguments)}}(),n.state={exam:null,currentQuestion:null,answers:[]},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,null===this.state.currentQuestion?r.a.createElement("div",null,"Loading..."):r.a.createElement(se,{onAnswer:function(t,a,n){return e.handleAnswer(t,a,n)},question:this.state.currentQuestion}))}},{key:"componentDidMount",value:function(){var e=Object(_.a)(A.a.mark((function e(){var t,a,n;return A.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=this.props.match.params.id,e.next=3,fetch("https://localhost:44312/exams/".concat(t),{method:"GET",headers:{"Content-Type":"application/json",Authorization:"Bearer ".concat(this.props.currentUser.accessToken)}});case 3:return a=e.sent,e.next=6,a.json();case 6:n=e.sent,this.setState({exam:n.data,currentQuestion:n.data.questions[0]});case 8:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()}]),a}(r.a.Component),oe=Object(d.b)((function(e,t){return{currentUser:e.currentUser}}),(function(e){return{}}))(ce),le=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){var e=this.props.location.state,t=e.questionCount,a=e.correctAnswers;return r.a.createElement("h2",null,"Result: ",a," / ",t,". Check profile page for more information")}}]),a}(r.a.Component),ue=Object(d.b)((function(e,t){return{}}),(function(e){return{}}))(le),ie=function(e){Object(i.a)(a,e);var t=Object(m.a)(a);function a(){return Object(l.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement(D,null,r.a.createElement(p.a,{exact:!0,path:"/",component:B}),r.a.createElement(p.a,{exact:!0,path:"/profile",component:te}),r.a.createElement(p.a,{exact:!0,path:"/login",component:z}),r.a.createElement(p.a,{exact:!0,path:"/register",component:$}),r.a.createElement(p.a,{exact:!0,path:"/exam/:id",component:oe}),r.a.createElement(p.a,{exact:!0,path:"/examfinish",component:ue}))}}]),a}(r.a.Component),me=a(32),pe=a(43),he={currentUser:null},de=(a(93),a(94),document.getElementsByTagName("base")[0].getAttribute("href")),fe=document.getElementById("root"),Ee=Object(me.b)((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:he,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"LOGIN":return Object(pe.a)({},e,{currentUser:t.payload});case"LOGOUT":return Object(pe.a)({},e,{currentUser:null});default:return e}}),window.__REDUX_DEVTOOLS_EXTENSION__&&window.__REDUX_DEVTOOLS_EXTENSION__());c.a.render(r.a.createElement(d.a,{store:Ee},r.a.createElement(o.a,{basename:de},r.a.createElement(ie,null))),fe)}},[[60,1,2]]]);
//# sourceMappingURL=main.aba65d93.chunk.js.map