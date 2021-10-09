import { Response, Request } from "express";
import createUser from "./services/CreateUser";

export function helloWorld(request: Request, response : Response){

  const user = createUser({
    email: 'joaoneivanetos@gmail.com',
    password: '123456',
    techs:[
      'node.js',
      'Reactjs',
      'reactNative',
    ],
  });
  return response.json({menssage:'hello world'});
}