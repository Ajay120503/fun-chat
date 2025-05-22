import React from 'react'
import useAuthUSer from '../hooks/useAuthUser'
import { Link, useLocation } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { logout } from '../lib/api';
import { BellDotIcon, LogOutIcon, Smartphone } from 'lucide-react';
import ThemeSelector from './ThemeSelector';

function Navbar() {

    const { authUser } = useAuthUSer();
    const location = useLocation();
    const isChatPage = location.pathname?.startsWith("/chat");
    const isNotificationPage = location.pathname?.startsWith("/notifications");
    const isHomePage = location.pathname?.startsWith("/");

    const queryClient = useQueryClient();

    const { mutate: logoutMutation } = useMutation({
        mutationFn: logout,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
    });

  return (
      <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center justify-center'>
          <div className='container mx-auto '>
              <div className='flex items-center justify-between w-full'>
                  <div className='flex items-center justify-start w-full '>
                      {(isChatPage || isNotificationPage || isHomePage) && (
                      <div className='pl-5 flex-row lg:hidden'>
                          <Link to='/' className='flex item-center gap-2'>
                              <Smartphone className="size-9 text-primary" />
                              <span className="hidden sm:block text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
                                FUN CHAT
                            </span>
                          </Link>
                      </div>
                  )}
                  </div>
                  <div className='flex items-center justify-end w-full gap-1'>
                      <div className='flex items-center gap-3 sm:gap-4'>
                      <Link to={"/notifications"}>
                          <button className='btn btn-ghost btn-circle'>
                              <BellDotIcon className='h-6 w-6 text-base-content opacity-70'/>
                          </button>
                      </Link>
                  </div>
                  <ThemeSelector />

                  <div className='avatar'>
                      <div className='w-9 rounded-full'>
                          <img src={authUser?.profilePic} />
                      </div> 
                  </div>
                  
                  <button className='btn btn-ghost btn-circle' onClick={logoutMutation}>
                      <LogOutIcon className='h-6 w-6 text-base-content opacity-70'/>
                  </button>
                  </div>
                  
              </div>
          </div>
    </nav>
  )
}

export default Navbar