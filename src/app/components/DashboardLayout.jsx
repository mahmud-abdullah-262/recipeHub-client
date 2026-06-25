
'use client'
import {LayoutSideContentLeft, Plus, Briefcase, Gear, House, Magnifier, Person, LayoutHeaderSideContent, MagnifierPlus, Bookmark, Flame, CreditCard, FileExclamation, Heart} from "@gravity-ui/icons";
import {Avatar, Button, Card, Drawer} from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const userNavLinks = [
  { icon: LayoutHeaderSideContent,      label: "Dashboard",    href: "/userDashboard" },
  { icon: MagnifierPlus, label: "Add Recipe",         href: "/userDashboard/addRecipe" },
  { icon: Bookmark,  label: "My Recipes",   href: "/userDashboard/myRecipes" },
  { icon: CreditCard,      label: "My Purchased Recipes", href: "/userDashboard/myPurchased" },
  { icon: Heart,    label: "Favorites",      href: "/userDashboard/favorites" },
  { icon: Person,          label: "Profile",     href: "/userDashboard/profile" },
];



const adminNavLinks = [
  { icon: LayoutHeaderSideContent, label: "Dashboard",  href: "/adminDashboard" },
  { icon: Person,                  label: "Users",      href: "/adminDashboard/users" },
  { icon: Flame,                label: "Recipes",  href: "/adminDashboard/recipes" },
  { icon: FileExclamation,               label: "Reports",       href: "/adminDashboard/reports" },
  { icon: CreditCard,              label: "Transactions",   href: "/adminDashboard/transactions" },
];

const navLinkMappings = {
  user : userNavLinks,
  admin: adminNavLinks
}

const DashboardLayout = ({user}) => {

 
  
  
  const pathname = usePathname();
  if(!user?.role) return null
   const navItems = navLinkMappings[user?.role] ?? []
     const navLinks =    
     <nav>
      {navItems.map(({ icon: Icon, label, href }) => (
        <Link
          key={href}
          href={href}
          className={`nav-item flex gap-2 items-center justify-start p-1 rounded ${pathname === href ? "active" : ""}`}
        >
          <Icon />
          <span>{label}</span>
        </Link>
      ))}
    </nav>
  return (
    <div className="fixed left-0 top-0 z-40 flex ">


  {/* টপ সেকশন: নেভিগেশন লিঙ্কস */}
  <div className="flex-1 overflow-y-auto">
    
    


    {/* ডেস্কটপ ভিউ */}
    <aside className="hidden bg-background md:flex flex-col justify-between border-r border-default h-screen w-64">

<div className="p-4">
     <Link href={'/'}>
    <Image
    src={'/images/recipehub logo.svg'}
    width={200}
    height={100}
    alt="logo"
    className="w-24 h-auto mb-4"
    />
    </Link>

      {navLinks}
</div>
   


 {/* বটম সেকশন: প্রোফাইল কার্ড */}
  <Card className=" w-full rounded-none border-t border-default shrink-0 self-end">
    <Card.Header className="flex items-center gap-3">
      <Avatar
        name={user.name}
        size="lg"
        className="shrink-0"
      />
      <div>
        <Card.Title className="capitalize">
          {user.name}
        </Card.Title>
        <Card.Description>
          {user.role}
        </Card.Description>
      </div>
    </Card.Header>

    <Card.Content>
      <div className="space-y-1 text-sm">
        <p>
          <span className="font-medium">ID:</span> {user.id}
        </p>
        <p className="truncate">
          <span className="font-medium">Email:</span> {user.email}
        </p>
      </div>
    </Card.Content>

    <Card.Footer>
      <span className="text-xs text-default-500 capitalize">
        {user.role} Account
      </span>
    </Card.Footer>
  </Card>
    </aside>

    {/* মোবাইল ভিউ (ড্রয়ার) */}
<Drawer>
  {/* বাটনটিকে স্ক্রিনের নিচে এবং মাঝখানে ফিক্সড করার জন্য ক্লাস আপডেট করা হয়েছে */}
  <Button 
    className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 shadow-lg px-6 py-3 rounded-full text-primary" 
    variant="secondary"
  >
    <LayoutSideContentLeft />
    Menu
  </Button>
  
  <Drawer.Backdrop>
    <Drawer.Content placement="left"> 
      <Drawer.Dialog>
        <Drawer.CloseTrigger />
        <Drawer.Body>
          {navLinks}
        </Drawer.Body>
      </Drawer.Dialog>
    </Drawer.Content>
  </Drawer.Backdrop>
</Drawer>
  </div>

 
</div>
  );
};

export default DashboardLayout;







// export function DashboardLayout({user}) {





//   return (
//     <>
  
//     
    // <Drawer >
    //   <Button className={'lg:hidden'} variant="secondary">
    //     <LayoutSideContentLeft />
    //     Menu
    //   </Button>
    //   <Drawer.Backdrop>
    //     <Drawer.Content placement="left">
    //       <Drawer.Dialog>
    //         <Drawer.CloseTrigger />
    //         <Drawer.Body>
    //           {navLinks}
    //         </Drawer.Body>
    //       </Drawer.Dialog>
    //     </Drawer.Content>
    //   </Drawer.Backdrop>
    // </Drawer>
//     </>
    
//   );
// }