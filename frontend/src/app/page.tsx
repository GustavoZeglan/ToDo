"use client"
import { CustomizedBr, FrameworkImg, Header, ImageMain, Img, Item, Main, Subtitle, TechContent, Tecnologies, Title } from '@/styles/HomePage.style';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function Home() {

  const router = useRouter();

  return (
    <>
      <Header className={styles.Header}>
        <Img src='/Tarefas.png' onClick={() => {router.push('/')}}/>

        <nav>
          <ul>
            <Item onClick={() => {router.push('/dashboard')}}>Dashboard</Item>
            <Item onClick={() => {router.push('/auth')}}>Login</Item>
          </ul>
        </nav>
      </Header>

      <Main>
        <Title>
          Um Simples Gerenciador<CustomizedBr/> de Tarefas
        </Title>
        <ImageMain src='/Projeto.png' />
      </Main>
      <Tecnologies>
        <Subtitle>
          Linguagens e Frameworks Utilizados
          <TechContent>
            <FrameworkImg src='/tsLogo.png' />
            <FrameworkImg src='/nextLogo.png' />
            <FrameworkImg src='/nestLogo.png' />
          </TechContent>
        </Subtitle>
      </Tecnologies>

    </>
  )
}

