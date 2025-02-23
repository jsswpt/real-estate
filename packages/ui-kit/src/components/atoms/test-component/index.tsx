import cn from 'clsx'

import styles from './styles.module.scss'

export type TestComponentProps = {}

export const TestComponent = ({}:TestComponentProps) => <div className={cn(styles.bg)}>TestComponent</div>