import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './components/common/layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './components/common/layouts/auth-layout/auth-layout.component';

import { AuthService } from './services/auth/auth.service';

export const rootRouterConfig: Routes = [{
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{
      path: 'sessions',
      loadChildren: './views/sessions/sessions.module#SessionsModule',
      data: { title: 'Session' }
    }]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthService],
    children: [{
        path: 'dashboard',
        loadChildren: './pages/dashboard/dashboard.module#DashboardModule',
        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'account',
        children: [{
            path: 'users',
            loadChildren: './pages/users/users.module#UsersModule',
            data: { title: 'Users', breadcrumb: 'USERS' }
          },
          {
            path: 'groups',
            loadChildren: './pages/groups/groups.module#GroupsModule',
            data: { title: 'Groups', breadcrumb: 'GROUPS' }
          }
        ]
      },
      {
        path: 'system',
        children: [
          {
            path: 'advanced',
            loadChildren: 'app/pages/system/system.module#SystemModule',
            data: { title: 'System', breadcrumb: 'ADVANCED' }
          },
          {
            path: 'ca',
            loadChildren: 'app/pages/system/ca/ca.module#CertificateAuthorityModule',
            data: { title: 'System', breadcrumb: 'CA' }
          },
          {
            path: 'certificates',
            loadChildren: 'app/pages/system/certificates/certificate.module#CertificateModule',
            data: { title: 'System', breadcrumb: 'Certificates' }
          },
        ]
      },
      {
        path: 'sharing',
        children: [{
            path: 'afp',
            loadChildren: './pages/sharing/afp/afp.module#AFPModule',
            data: { title: 'AFP', breadcrumb: 'AFP' },
          },
          {
            path: 'nfs',
            loadChildren: './pages/sharing/nfs/nfs.module#NFSModule',
            data: {title: 'NFS', breadcrumb: 'NFS'},
          },
          {
            path: 'webdav',
            loadChildren: './pages/sharing/webdav/webdav.module#WebdavModule',
            data: {title: 'WebDAV', breadcrumb: 'WebDAV'},
          },
          {
            path: 'smb',
            loadChildren: './pages/sharing/smb/smb.module#SMBModule',
            data: {title: 'SMB', breadcrumb: 'SMB'},
          }
        ]
      },
      {
        path: 'reportsdashboard',
        loadChildren: './pages/reportsdashboard/reportsdashboard.module#ReportsDashboardModule',
        data: { title: 'reportsdashboard', breadcrumb: 'REPORTING' }
      }
    ]
  },
  {
    path: 'reportsdashboard',
    loadChildren: './pages/reportsdashboard/reportsdashboard.module#ReportsDashboardModule',
    data: { title: 'reportsdashboard', breadcrumb: 'REPORTING' }
  },
  {
    path: '**',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  }
];