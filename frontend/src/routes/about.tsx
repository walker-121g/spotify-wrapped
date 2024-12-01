import { createFileRoute } from "@tanstack/react-router";

import { Header } from "@/components/router/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export const Route = createFileRoute("/about")({
  component: () => <AboutPage />,
});

function AboutPage() {
  return (
    <div className="w-screen h-screen flex flex-col overflow-y-auto">
      <Header />
      <main className="w-screen min-h-screen flex flex-col items-center text-center p-24 my-16">
        <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold">About Us</h1>
        <p className="text-xs md:text-sm mt-4 mb-8">
          Meet the team behind the magic
        </p>
        <section className="w-full md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-4 justify-center items-center text-left">
          <Card>
            <CardHeader className="w-full flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src="https://cdn.discordapp.com/attachments/1278150900854161490/1289759362385969213/Z.png?ex=674db4c2&is=674c6342&hm=e8aecd0a0c2e0a7ce5a39bce6f27d01d0cd0ace053a70dedfe9af862341661d3&"
                />
                <AvatarFallback>SY</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>Sam Yauger</CardTitle>
                <CardDescription>Full-Stack Developer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hi, I’m Sam! With a limited background in web development and a
                passion for continuous learning, I had the opportunity to dive
                deep into authentication and backend functionality. Working with
                an incredible team, we collaborated in real-time and grew
                together, making this an enriching and impactful experience for
                all of us!
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="w-full flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src="https://cdn.discordapp.com/attachments/1278150900854161490/1289407758340460666/IMG_5120.jpg?ex=674dbecd&is=674c6d4d&hm=be60fb4058176cf61b1f1cd15bf9bf31a06e390a40622c461a7506fa04fcb74c&"
                />
                <AvatarFallback>DA</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>Daniel Arias</CardTitle>
                <CardDescription>Full-Stack Developer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hello, I'm Daniel and this is the second Web Dev project I have
                ever worked on, so I was able to learn a lot with the help from
                my teammates. I worked on displaying the user's Spotify data,
                including the summary slides of the user's Wrap, and I also
                contributed a bit to the dropdown with the user's profile
                picture in the navbar.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="w-full flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src="https://cdn.discordapp.com/attachments/1278150900854161490/1289338394769621012/9A695E5B-B7E8-48AD-8CC0-5FDCC8BF6253_1_105_c.jpeg?ex=674d7e34&is=674c2cb4&hm=c987e682baca0902b51a055f497cf546f5de206199243b69ba0c98bb31b8a688&"
                />
                <AvatarFallback>RK</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>Romulus Kahlil</CardTitle>
                <CardDescription>Full-Stack Developer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hey I'm Romulus! I have experience building full-stack web
                applications and other web based projects. On our project, I
                created the favorites dialogue on the main page, fixed numerous
                bugs, and troubleshooted issues my fellow group members were
                having.
              </CardDescription>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="w-full flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src="https://cdn.discordapp.com/attachments/1278150900854161490/1289408988974153759/IMG_4552.jpg?ex=674dbff3&is=674c6e73&hm=ff6152278b1c146a079aa7268ab05ece14d09e73694bb804166c63a179f7f2a1&"
                />
                <AvatarFallback>NX</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>Nathan Xie</CardTitle>
                <CardDescription>Full-Stack Developer</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hello, I'm Nathan. I have very little web dev experience and
                have learned much with this project. On this project, I worked
                on the review dialogue and added some backend functions
                involving the reviews with assistance from my other group
                members.
              </CardDescription>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 mb-16">
            <CardHeader className="w-full flex flex-row gap-4 items-center">
              <Avatar>
                <AvatarImage
                  className="object-cover"
                  src="https://cdn.discordapp.com/attachments/1278150900854161490/1289760398719057920/image.png?ex=674db5b9&is=674c6439&hm=8d2b5c47e01ea55c5185a316c0454c3d429ec6a0b1284e02f9e154f2a50bb2ed&"
                />
                <AvatarFallback>WC</AvatarFallback>
              </Avatar>
              <div className="flex flex-col gap-1">
                <CardTitle>Walker Camp</CardTitle>
                <CardDescription>Scrum Master</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Hi, I'm Walker! I have some experience with full-stack
                development, primarily with React. For this project I helped
                setup the website structure, created some backend endpoints for
                wraps and posts, and helped manage the Trello board. I have
                learned a lot about "project management" throughout this project
                and will definitely apply those skills when necessary.
              </CardDescription>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
}
