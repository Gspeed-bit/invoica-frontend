import Link from 'next/link';
import { Bell, ChevronDown, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function TopBar() {
  // Simulating a user for now
  const user = {
    firstName: 'John',
    lastName: 'Doe',
    imgUrl: '/placeholder-avatar.png', // Replace with actual user image URL if available
  };

  const logOutUser = () => {
    // Implement log out functionality
  };

  return (
    <div className='flex items-center justify-end space-x-4 p-4 border-b border-gray-200'>
      <div className='relative hidden md:block'>
        <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground' />
        <Input
          type='search'
          placeholder='Search...'
          className='pl-10 w-[300px] md:w-[400px] bg-muted'
        />
      </div>
      <Link href={'/dashboard/notification'}>
        <Button variant='ghost' size='icon' className='relative'>
          <Bell className='h-5 w-5' />
          <span className='absolute top-0 right-0 h-2 w-2 bg-destructive rounded-full'></span>
        </Button>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex items-center space-x-2 hover:bg-accent hover:text-accent-foreground'
          >
            <Avatar className='h-8 w-8 border border-border'>
              <AvatarImage src={user?.imgUrl} />
              <AvatarFallback className='bg-primary text-primary-foreground'>
                {user?.firstName?.[0]}
                {user?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <span className='hidden md:inline-block font-medium'>
              {user?.firstName}
            </span>
            <ChevronDown className='h-4 w-4' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-56'>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Link href='/' className='flex w-full'>
              Home
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={logOutUser} className='text-destructive'>
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
