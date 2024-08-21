//adminPaymentPage.jsx

import React from 'react';
import AdminPayment from '@/components/adminPage/adminPayment';
import NestedList from '@/components/adminPage/adminSideMenu';
import styles from '@/styles/adminPage/adminPage.module.css';

export default function AdminPaymentPage() {
    return (
        <div className={styles.container}>
            <div className={styles.sidebar}>
                <NestedList />
            </div>
            <div className={styles.content}>
                <AdminPayment />
            </div>
        </div>
    );
}