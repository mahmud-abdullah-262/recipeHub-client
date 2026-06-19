import { NextResponse } from 'next/server'
import { getSessionData } from './lib/action/getSession'
 
// This function can be marked `async` if using `await` inside
export async function proxy(request) {
   const session = await getSessionData()

    console.log(session , 'session')
  

  if(session){
    return NextResponse.next()
  }
  else {
     return NextResponse.redirect(new URL('/signin', request.url))
  }
 
}

export const config = {
  matcher: ['/recipes/:path+'],
}