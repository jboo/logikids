import { Cog6ToothIcon } from '@heroicons/react/24/outline'
import { useNavigate } from 'react-router-dom'
import { interactive, position } from '../base/styles'
import { cn } from '../base/styles/utils'
import { useTranslation } from 'react-i18next'

export function SettingsButton() {
  const navigate = useNavigate()
  const { t } = useTranslation()
  
  return (
    <button
      type="button"
      onClick={() => navigate('/account')}
      className={cn(
        position.fixed,
        'top-4 right-4',
        'text-gray-500 hover:text-primary-600',
        interactive.transition,
        'z-10'
      )}
    >
      <span className="sr-only">{t('account.title')}</span>
      <Cog6ToothIcon className="h-5 w-5" aria-hidden="true" />
    </button>
  )
} 