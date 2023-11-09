var ROUTES_INDEX = {"name":"<root>","kind":"module","className":"AppModule","children":[{"name":"routes","filename":"src/app/app-routing.module.ts","module":"AppRoutingModule","children":[{"path":"","redirectTo":"home","pathMatch":"full"},{"path":"course/:courseid/home","component":"HomeComponent"},{"path":"home","component":"HomeComponent"},{"path":"data-consent","component":"DataConsentComponent"},{"path":"no-data-consent","component":"NoDataConsentComponent"},{"path":"course/:courseid/forbidden","component":"NoPrivilegesComponent"},{"path":"forbidden","component":"NoPrivilegesComponent"},{"path":"course/:courseid","pathMatch":"full","redirectTo":"/course/:courseid/list-tickets"},{"path":"404","pathMatch":"full","component":"PageNotFoundComponent"},{"path":"course/:courseid/:any","component":"PageNotFoundComponent"},{"path":"course/:courseid/:any/:any","component":"PageNotFoundComponent"},{"path":"course/:courseid/:any/:any/:any","component":"PageNotFoundComponent"},{"path":"**","component":"PageNotFoundComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/course/course-routing.module.ts","module":"CourseRoutingModule","children":[{"path":"course/:courseid/join","component":"JoinComponent"},{"path":"course/:courseid/settings","component":"SettingsComponent"},{"path":"course/:courseid/settings/field/:fieldid","component":"EditFieldComponent"},{"path":"course/:courseid/settings/field","component":"EditFieldComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/ticket/ticket-routing.module.ts","module":"TicketRoutingModule","children":[{"path":"course/:courseid/ticket-view/:id","component":"TicketViewComponent"},{"path":"course/:courseid/submit","component":"SubmitTicketComponent"},{"path":"course/:courseid/submit/:id","component":"SubmitTicketComponent"},{"path":"course/:courseid/submit-faq","component":"SubmitFaqComponent"},{"path":"course/:courseid/submit-faq/:id","component":"SubmitFaqComponent"},{"path":"course/:courseid/faq-view/:id","component":"FaqViewComponent"},{"path":"course/:courseid/list-tickets","component":"ListingComponent"}],"kind":"module"},{"name":"routes","filename":"src/app/user/user-routing.module.ts","module":"UserRoutingModule","children":[{"path":"course/:courseid/login","component":"LoginComponent"},{"path":"course/:courseid/register","component":"RegisterComponent"},{"path":"course/:courseid/profile","component":"ProfileComponent"}],"kind":"module"}]}
