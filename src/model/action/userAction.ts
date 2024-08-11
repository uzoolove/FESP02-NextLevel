'use server';

import { ApiResWithValidation, CoreErrorRes, FileRes, MultiItem, SingleItem, UserData, UserForm, UserLoginForm } from "@/types";
import { signIn } from "@/auth";
import { redirect } from "next/navigation";

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;

export async function signup(formData: FormData): Promise<ApiResWithValidation<SingleItem<UserData>, UserForm>> {
  const userObj = {
    type: formData.get('type') || 'user',
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    image: '',
  }

  // 이미지 먼저 업로드
  const attach = formData.get('attach') as File;

  if (attach.size > 0) {
    // 프로필 이미지를 추가한 경우
    const fileRes = await fetch(`${SERVER}/files`, {
      method: 'POST',
      headers: {
        'client-id': process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID
      },
      body: formData,
    });

    if(!fileRes.ok){
      throw new Error('파일 업로드 실패');
    }
    const fileData: MultiItem<FileRes> = await fileRes.json();
    // 서버로부터 응답받은 이미지 이름을 회원 정보에 포함
    userObj.image = fileData.item[0].path;
  } 

  const res = await fetch(`${SERVER}/users`, {
    method: 'POST',
    headers: {
      'client-id': process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(userObj)
  });

  return res.json();
}

export async function signInWithCredentials(loginData: UserLoginForm): Promise<ApiResWithValidation<SingleItem<UserForm>, UserLoginForm>> {
  try{
    const result = await signIn('credentials', { ...loginData, redirect: false, redirectTo: '/movies' });
    console.log('signInWithCredentials 로그인한 결과', result);
  }catch(err){
    console.error(err);
    if(err instanceof Error){
      return err.cause as CoreErrorRes;
    }
  }
  redirect('/');
}

export async function login(userObj: UserLoginForm): Promise<ApiResWithValidation<SingleItem<UserData>, UserLoginForm>> {
  const res = await fetch(`${SERVER}/users/login`, {
    method: 'POST',
    headers: {
      'client-id': process.env.NEXT_PUBLIC_API_SERVER_CLIENT_ID,
      'Content-type': 'application/json'
    },
    body: JSON.stringify(userObj),
  });
  return res.json();
}

export async function signInWithGoogle(formData: FormData){
  await signIn('google', { redirectTo: '/' });
}

export async function signInWithGithub(formData: FormData){
  await signIn('github', { redirectTo: '/' });
}