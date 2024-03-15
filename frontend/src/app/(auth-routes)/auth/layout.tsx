"use client"
import { Content, Layout } from '@/styles/AuthLayout.style';
import React from 'react';
import { LayoutProps } from '../../../../.next/types/app/layout';

const AuthLayout:React.FC<LayoutProps> = ({children}) => {

    return (
        <Layout>
            <Content>
            <main>{children}</main>
            </Content>
        </Layout>
    );

};

export default AuthLayout