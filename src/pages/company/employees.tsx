import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import Header from 'src/components/header'
import HeaderCompanySubNav from 'src/components/header/headerCompanySubNav'
import {
  changeUserStatus,
  deleteInvite,
  getCompanyPendingInvites,
  getEmployees,
} from 'src/redux/company/actions'
import { AppDispatch, RootState } from 'src/configureStore'
import EmployeeRow from './employeeRow'
import { CompanyPendingInvite, User } from 'src/apiTypes'
import InviteRow from './inviteRow'
import Placeholder from './placeHolder'
import { backgroundCardHeight } from 'src/tables'
import InviteEmployees from 'src/components/modals/inviteEmployees'
import { capitalize } from 'src/utitlity'
import { updateJobTitle } from 'src/redux/teams/actions'
import UserFeedbacks from 'src/components/modals/userFeedbacks'
import { selectUser } from 'src/redux/auth/actions'
import { useTranslation } from 'react-i18next'

const mapStateToProps = (state: RootState) => ({
  user: state.authReducer.user,
  company: state.companyReducer.company,
  employees: state.companyReducer.employees,
  pendingInvites: state.companyReducer.companyPendingInvites,
})

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  getEmployees: (mode: 'active' | 'archived') => dispatch(getEmployees(mode)),
  getCompanyPendingInvites: () => dispatch(getCompanyPendingInvites()),
  changeUserStatus: (userId: string, status: string) =>
    dispatch(changeUserStatus(userId, status)),
  deleteInvite: (inviteId: string) => dispatch(deleteInvite(inviteId)),
  updateJobTitle: (userId: string, jobtitle: string) =>
    dispatch(updateJobTitle(userId, jobtitle)),
  selectUserInReducer: (user: User) => dispatch(selectUser(user)),
})

const connector = connect(mapStateToProps, mapDispatchToProps)

type PropsFromRedux = ConnectedProps<typeof connector>

type Props = PropsFromRedux & {}

const CompanyOverview = (props: Props) => {
  const { t } = useTranslation(['companyEmployeesPage', 'common'])
  const {
    company,
    employees,
    getEmployees,
    changeUserStatus,
    getCompanyPendingInvites,
    pendingInvites,
    deleteInvite,
    updateJobTitle,
    selectUserInReducer,
  } = props
  useEffect(() => {
    if (company) {
      getCompanyPendingInvites()
    }
  }, [company])

  useEffect(() => {
    backgroundCardHeight()
  })

  console.log('employees')
  console.log(pendingInvites)

  const [filteredEmployees, setFilteredEmployees] = useState<User[]>([])

  useEffect(() => {
    if (employees) {
      sortMembers('firstname', 1)
    }
  }, [employees])
  const [keyword, setKeyword] = useState('')
  const filterEmployees = (keyword: string) => {
    setKeyword(keyword)
    let emp = employees ? [...employees] : []
    emp = emp.filter(
      (e) =>
        e.firstname.toLowerCase().includes(keyword.toLowerCase()) ||
        e.lastname.toLowerCase().includes(keyword.toLowerCase())
    )
    let invites = pendingInvites ? [...pendingInvites] : []
    invites = invites.filter((e) =>
      e.invitedUser.toLowerCase().includes(keyword.toLowerCase())
    )
    setFilteredEmployees(emp)
    setFilteredInvites(invites)
  }

  const [currentSort, setCurrentSort] = useState('firstname')
  const sortResults = (what: 'firstname' | 'email' | 'jobtitle') => {
    let emp = employees ? [...employees] : []
    setCurrentSort(what)
    emp.sort((a, b) => {
      if (a[what] < b[what]) {
        return -1
      }
      return 1
    })
    setFilteredEmployees(emp)
  }

  const [filteredInvites, setFilteredInvites] = useState<
    CompanyPendingInvite[]
  >([])

  const sortMembers = (
    what: 'firstname' | 'jobtitle' | 'email',
    type: 1 | -1
  ) => {
    setCurrentSort(what)
    const members = employees ? [...employees] : []
    const filtered = members.sort((a, b) => {
      if (a[what] < b[what]) {
        return 1 * type
      } else {
        return -1 * type
      }
    })

    if (what === 'firstname' || what === 'email') {
      const invites = pendingInvites ? [...pendingInvites] : []
      const filteredInvite = invites.sort((a, b) => {
        if (a.invitedUser < b.invitedUser) {
          return 1 * type
        } else {
          return -1 * type
        }
      })
      setFilteredInvites(invites)
    }

    setFilteredEmployees(filtered)
  }

  const [mode, setMode] = useState<'active' | 'archived'>('active')
  const [sortType, setSortType] = useState<1 | -1>(1)

  useEffect(() => {
    if (mode && company) {
      setFilteredEmployees([])
      getEmployees(mode)
    }
  }, [mode, company])

  useEffect(() => {
    if (pendingInvites) {
      setFilteredInvites(pendingInvites)
    }
  }, [pendingInvites])

  useEffect(() => {
    if (keyword || filteredInvites || filteredEmployees) {
      backgroundCardHeight()
    }
  }, [keyword, filteredInvites, filteredEmployees])
  const [selectedFilter, setSelectedFilter] = useState<
    'firstname' | 'jobtitle' | 'email'
  >('firstname')

  const noSearchPlaceholderLogic = () => {
    if (
      employees &&
      !employees.length &&
      pendingInvites &&
      !pendingInvites.length
    ) {
      return false
    }

    if (keyword && !filteredEmployees.length && !filteredInvites.length) {
      return true
    }

    return false
  }
  const searchPlace = noSearchPlaceholderLogic()
  const [selectedMember, selectMember] = useState<User | null>(null)
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
              {t('common:Employees')} <span>{employees?.length}</span>
            </p>
            <div className="options">
              <button
                onClick={() => setMode('active')}
                className={`options-link ${mode === 'active' ? 'active' : ''}`}
              >
                {t('companyEmployeesPage:Activeemployees')}
              </button>
              <span className="options-divider">I</span>
              <button
                onClick={() => setMode('archived')}
                className={`options-link ${
                  mode === 'archived' ? 'active' : ''
                }`}
              >
                {t('companyEmployeesPage:Archivedemployees')}
              </button>
            </div>
            <div className="content-card-header-bottom">
              <div className="content-card-input-container">
                <input
                  type="text"
                  placeholder="Search"
                  onChange={(e) => filterEmployees(e.target.value)}
                />
                <i className="icon-search"></i>
              </div>
              {mode === 'active' && (
                <button
                  className="button button-light-gray modal-trigger"
                  target-modal="inviteEmployeesModal"
                  onClick={() =>
                    document
                      .getElementById('inviteEmployeesModal')
                      ?.classList.add('open')
                  }
                >
                  {t('common:Addnew')}
                </button>
              )}
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
                          selectedFilter === 'firstname' ? ' active' : ''
                        } ${
                          selectedFilter === 'firstname' && sortType === -1
                            ? ' up'
                            : ''
                        }`}
                        onClick={() => {
                          setSortType(sortType === 1 ? -1 : 1)
                          sortMembers('firstname', sortType === 1 ? -1 : 1)
                          setSelectedFilter('firstname')
                        }}
                      >
                        <p>{t('common:Name')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-02 ${
                          selectedFilter === 'email' ? ' active' : ''
                        } ${
                          selectedFilter === 'email' && sortType === -1
                            ? ' up'
                            : ''
                        }`}
                        onClick={() => {
                          setSortType(sortType === 1 ? -1 : 1)
                          sortMembers('email', sortType === 1 ? -1 : 1)
                          setSelectedFilter('email')
                        }}
                      >
                        <p>{t('common:Email')}</p>
                        <i className="icon-caret-down"></i>
                      </th>
                      <th
                        className={`column-03 ${
                          selectedFilter === 'jobtitle' ? ' active' : ''
                        } ${
                          selectedFilter === 'jobtitle' && sortType === -1
                            ? ' up'
                            : ''
                        }`}
                        onClick={() => {
                          setSortType(sortType === 1 ? -1 : 1)
                          sortMembers('jobtitle', sortType === 1 ? -1 : 1)
                          setSelectedFilter('jobtitle')
                        }}
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
                    {!!employees && !employees.length && (
                      <Placeholder mode={mode} />
                    )}

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
                    {mode === 'active'
                      ? filteredEmployees?.map((employee) => (
                          <EmployeeRow
                            key={employee._id}
                            selectUser={() => selectUserInReducer(employee)}
                            user={employee}
                            onView={() => selectMember(employee)}
                            updateJobTitle={(text) =>
                              updateJobTitle(employee._id, text)
                            }
                            onArchive={() =>
                              changeUserStatus(employee._id, 'archived')
                            }
                          />
                        ))
                      : filteredEmployees?.map((employee) => (
                          <EmployeeRow
                            key={employee._id}
                            user={employee}
                            onView={() => selectMember(employee)}
                            onArchive={() =>
                              changeUserStatus(employee._id, 'active')
                            }
                            status="Archived"
                            onDelete={() =>
                              changeUserStatus(employee._id, 'deleted')
                            }
                          />
                        ))}
                    {mode === 'active' &&
                      filteredInvites.map((invite) => (
                        <InviteRow
                          data={invite}
                          onDelete={() => deleteInvite(invite._id)}
                          key={invite._id}
                        />
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <UserFeedbacks user={selectedMember} />
      <InviteEmployees />
    </div>
  )
}

export default connector(CompanyOverview)
