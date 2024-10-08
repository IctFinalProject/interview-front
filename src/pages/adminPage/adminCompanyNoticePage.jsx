// adminCompanyNoticePage.jsx

import React from 'react';
import AdminCompanyNotice from 'components/adminPage/adminCompanyNotice';
import {withAdminAuth} from '@/utils/withAdminAuth';

const AdminCompanyNoticePage = () => {
    return (
        <div>
            {/* AdminCompanyNotice 컴포넌트를 사용하여 공지사항 페이지 전체를 렌더링 */}
            <AdminCompanyNotice />
        </div>
    );
};

export default withAdminAuth(AdminCompanyNoticePage);