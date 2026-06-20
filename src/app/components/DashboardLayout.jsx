
'use client'
import {LayoutSideContentLeft, Plus, Briefcase, Gear, House, Magnifier, Person, LayoutHeaderSideContent, MagnifierPlus, Bookmark, Flame, CreditCard, FileExclamation, Heart} from "@gravity-ui/icons";
import {Avatar, Button, Card, Drawer} from "@heroui/react";
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
    <div className="flex flex-col justify-between h-screen border-r border-default">



    <aside className="hidden lg:block w-64  p-4">
    {navLinks}
    </aside>
  <Drawer >
      <Button className={'lg:hidden'} variant="secondary">
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

    
{/* profile */}
<Card className="w-64 rounded-none border-t border-default">
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
            <span className="font-medium">ID:</span>{" "}
          {user.id}
          </p>
          <p className="truncate">
            <span className="font-medium">Email:</span>{" "}
            {user.email}
          </p>
        </div>
      </Card.Content>

      <Card.Footer>
        <span className="text-xs text-default-500 capitalize">
          {user.role} Account
        </span>
      </Card.Footer>
    </Card>
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