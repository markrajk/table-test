import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Header from 'src/components/header'
import HeaderCompanySubNav from 'src/components/header/headerCompanySubNav'
import {
  addCompanyAdmin,
  changeUserStatus,
  getAdmins,
  inviteEmployees,
} from 'src/redux/company/actions'
import { AppDispatch, RootState } from 'src/configureStore'
import EmployeeRow from './employeeRow'
import InviteEmployees from 'src/components/modals/inviteEmployees'
import { InviteEmployeesVariables, User } from 'src/apiTypes'
import { backgroundCardHeight } from 'src/tables'
import { GetUserSuggestionsAction } from 'src/redux/teams/constants'
import { getUserSuggestion } from 'src/redux/teams/actions'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  company: state.companyReducer.company,
  admins: state.companyReducer.admins,
  userSuggestions: state.teamReducer.userSuggestions,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getAdmins: () => dispatch(getAdmins()),
  changeUserStatus: (userId: string, status: string, admin: boolean) =>
    dispatch(changeUserStatus(userId, status, admin)),
  inviteEmployees: (data: InviteEmployeesVariables) =>
    dispatch(inviteEmployees(data)),
  getUserSuggestion: (data: { companyId: string; keyword: string }) =>
    dispatch(getUserSuggestion(data)),
  addAdmin: (user: User) => dispatch(addCompanyAdmin(user)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const CompanyOverview = (props: Props) => {
  const { t } = useTranslation(['companyAdminPage', 'common'])
  const {
    company,
    admins,
    getAdmins,
    changeUserStatus,
    inviteEmployees,
    userSuggestions,
    getUserSuggestion,
    addAdmin,
  } = props
  const [email, setEmail] = useState('')
  useEffect(() => {
    if (company) {
      getAdmins()
    }
  }, [company])

  const [filteredEmployees, setFilteredEmployees] = useState<User[]>([])

  useEffect(() => {
    if (admins) {
      sortResults('firstname')
    }
  }, [admins])

  useEffect(() => {
    backgroundCardHeight()
  })
  const [keyword, setKeyword] = useState('')
  const filterEmployees = (keyword: string) => {
    setKeyword(keyword)
    let emp = admins ? [...admins] : []
    emp = emp.filter(
      (e) =>
        e.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
        e.lastname.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredEmployees(emp)
  }

  const [currentSort, setCurrentSort] = useState('firstname')
  const sortResults = (what: 'firstname' | 'email' | 'jobtitle') => {
    let emp = admins ? [...admins] : []
    setCurrentSort(what)
    emp.sort((a, b) => {
      if (a[what] < b[what]) {
        return -1
      }
      return 1
    })
    setFilteredEmployees(emp)
  }

  const noSearchPlaceholderLogic = () => {
    if (admins && !admins.length) {
      return false
    }

    if (keyword && !filteredEmployees.length) {
      return true
    }

    return false
  }
  const searchPlace = noSearchPlaceholderLogic()

  return (
    <div
      className="content-wrapper"
      onClick={() =>
        document.getElementById('mainDrawer')?.classList.remove('open')
      }
    >
      <div className="content">
        <div className="content-card">
          <div className="fake-card"></div>
          <div className="content-card-header">
            <p className="content-card-header-title">
              {t('common:Adminrights')}
            </p>
            <p className="content-card-header-caption-text">
              {t('companyAdminPage:pageHeaderSubtitle')}.
            </p>
            <div className="content-card-header-bottom">
              <div className="content-card-input-container">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => filterEmployees(e.target.value)}
                />
                <i className="icon-search"></i>
              </div>
              <button
                className="button button-light-gray toggle-input-row"
                onClick={() => {
                  document
                    .querySelector('.custom-table-input-row')
                    ?.classList.toggle('open')
                  backgroundCardHeight()
                }}
              >
                {t('common:Addnew')}
              </button>
            </div>
          </div>
          <div className="content-card-main">
            <div className="custom-table-wrapper">
              <div className="custom-table-wrapper-head">
                <table className="custom-table head">
                  <thead className="custom-table-head">
                    <tr className="custom-table-row">
                      <th
                        className={`column-01 ${
                          currentSort === 'firstname' ? 'active' : ''
                        }`}
                        onClick={() => sortResults('firstname')}
                      >
                        <p>{t('common:Name')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-02 ${
                          currentSort === 'email' ? 'active' : ''
                        }`}
                        onClick={() => sortResults('email')}
                      >
                        <p>{t('common:Email')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-03 ${
                          currentSort === 'jobtitle' ? 'active' : ''
                        }`}
                        onClick={() => sortResults('jobtitle')}
                      >
                        <p>{t('common:Jobtitle')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th className="column-04">
                        <p>{t('common:Status')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th className="column-05"></th>
                    </tr>
                  </thead>
                </table>
              </div>
              <div className="custom-table-wrapper-body">
                <table className="custom-table with-border">
                  <tbody className="custom-table-body">
                    <tr
                      className="table-placeholder no-results"
                      style={searchPlace ? {} : { display: 'none' }}
                    >
                      <td colSpan={100}>
                        <img
                          src="/img/table-placeholder-img-no-results.png"
                          alt="Clip art"
                          className="table-placeholder-img "
                        />
                        <p className="table-placeholder-title">
                          {t('common:noSearchResults')}
                        </p>
                      </td>
                    </tr>
                    <tr className="custom-table-input-row">
                      <td className="column-01">
                        <div className="input-container search">
                          <input
                            value={email}
                            type="text"
                            placeholder={`${t('common:Enternameoremail')}`}
                            onChange={(e) => {
                              setEmail(e.target.value)
                              if (company) {
                                getUserSuggestion({
                                  keyword: e.target.value,
                                  companyId: company._id,
                                })
                              }
                            }}
                          />

                          <div className="search-menu">
                            <div
                              className="search-menu-placeholder"
                              style={{ display: 'none' }}
                            >
                              <img
                                src="/img/table-placeholder-img-no-results.png"
                                alt="Clip art"
                                className="search-menu-placeholder-img"
                              />
                              <p className="search-menu-placeholder-title">
                                {t('common:Usernotfound')}
                              </p>
                              <p className="search-menu-placeholder-text">
                                {t('common:Pleaseentertheemailaddress')}.
                              </p>
                            </div>

                            {userSuggestions?.map((user) => (
                              <div
                                key={user._id}
                                className="search-menu-item"
                                onClick={() => {
                                  addAdmin(user)
                                }}
                              >
                                <div className="search-menu-item-initials">
                                  {user.firstname[0] + user.lastname[0]}
                                </div>
                                <div className="search-menu-item-set">
                                  <p className="search-menu-item-set-name">
                                    {user.firstname + ' ' + user.lastname}
                                  </p>
                                  <p className="search-menu-item-set-position">
                                    {user.jobtitle || 'Job title missing'}
                                  </p>
                                </div>
                                <button className="search-menu-item-button">
                                  {t('common:Select')}
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </td>

                      <td className="column-02">
                        <button
                          className="button button-primary"
                          onClick={() => {
                            inviteEmployees({
                              emails: [email],
                              type: 'admins',
                            })
                            setEmail('')
                            document
                              .querySelector('.custom-table-input-row')
                              ?.classList.toggle('open')
                          }}
                        >
                          {t('common:Add')}
                        </button>
                        <button
                          className="button button-light-gray"
                          onClick={() => {
                            document
                              .querySelector('.custom-table-input-row')
                              ?.classList.toggle('open')
                            backgroundCardHeight()
                          }}
                        >
                          {t('common:Cancel')}
                        </button>
                      </td>
                    </tr>
                    {filteredEmployees?.map((employee) => (
                      <EmployeeRow
                        key={employee._id}
                        user={employee}
                        onArchive={() =>
                          changeUserStatus(employee._id, 'archived', true)
                        }
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InviteEmployees type="admin" />
    </div>
  )
}

export default connector(CompanyOverview)
