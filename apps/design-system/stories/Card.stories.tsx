import React from 'react'
import type { Meta, StoryObj } from '@storybook/react'

/**
 * **Card Component**
 *
 * Container component for grouping related content. Provides elevation
 * through shadows and consistent padding/border-radius.
 *
 * Note: This is a demonstration component. Implement actual Card in @workspace/ui.
 */

// Simple Card implementation for demonstration
const Card = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}

const CardHeader = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardTitle = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => {
  return (
    <h3
      className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h3>
  )
}

const CardDescription = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => {
  return (
    <p className={`text-sm text-muted-foreground ${className}`} {...props}>
      {children}
    </p>
  )
}

const CardContent = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

const CardFooter = ({
  children,
  className = '',
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  )
}

const meta = {
  title: 'Components/Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Flexible container component for grouping content. Supports header, body, and footer sections.',
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

// ═══════════════════════════════════════════════════════════════════════════
// Basic Examples
// ═══════════════════════════════════════════════════════════════════════════

export const Simple: Story = {
  render: () => (
    <Card style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>Card description goes here</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          This is the card content area. You can put any content here.
        </p>
      </CardContent>
    </Card>
  ),
}

export const WithFooter: Story = {
  render: () => (
    <Card style={{ width: '350px' }}>
      <CardHeader>
        <CardTitle>Complete Card</CardTitle>
        <CardDescription>With header, body, and footer</CardDescription>
      </CardHeader>
      <CardContent>
        <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
          Card content with multiple sections demonstrated.
        </p>
      </CardContent>
      <CardFooter>
        <button
          style={{
            padding: '0.5rem 1rem',
            background: '#a855f7',
            color: 'white',
            border: 'none',
            borderRadius: '0.5rem',
            cursor: 'pointer',
          }}
        >
          Action
        </button>
      </CardFooter>
    </Card>
  ),
}

// ═══════════════════════════════════════════════════════════════════════════
// Showcase
// ═══════════════════════════════════════════════════════════════════════════

export const CardShowcase: Story = {
  render: () => (
    <div
      style={{
        padding: '2rem',
        background: 'oklch(0.145 0 0)',
        minHeight: '100vh',
      }}
    >
      <div
        style={{
          marginBottom: '3rem',
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(139, 92, 246, 0.1) 50%, rgba(99, 102, 241, 0.1) 100%)',
          borderRadius: '1rem',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <h1
          style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(90deg, #a855f7 0%, #8b5cf6 50%, #6366f1 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '0.5rem',
          }}
        >
          Card Component
        </h1>
        <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.125rem' }}>
          Flexible container for grouping related content
        </p>
      </div>

      {/* Grid of Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginBottom: '3rem',
        }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Basic Card</CardTitle>
            <CardDescription>Simple card with title and description</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              This card demonstrates the basic structure with header and content.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>With Action</CardTitle>
            <CardDescription>Card with footer actions</CardDescription>
          </CardHeader>
          <CardContent>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255, 255, 255, 0.7)' }}>
              Cards can include interactive elements in the footer.
            </p>
          </CardContent>
          <CardFooter style={{ gap: '0.5rem' }}>
            <button
              style={{
                padding: '0.5rem 1rem',
                background: '#a855f7',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Primary
            </button>
            <button
              style={{
                padding: '0.5rem 1rem',
                background: 'transparent',
                color: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(168, 85, 247, 0.3)',
                borderRadius: '0.5rem',
                cursor: 'pointer',
                fontSize: '0.875rem',
              }}
            >
              Secondary
            </button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Card</CardTitle>
            <CardDescription>Rich content example</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(168, 85, 247, 0.1)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                <strong style={{ color: '#a855f7' }}>Feature:</strong> Nested content
              </div>
              <div
                style={{
                  padding: '1rem',
                  background: 'rgba(139, 92, 246, 0.1)',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                }}
              >
                <strong style={{ color: '#8b5cf6' }}>Usage:</strong> Flexible layouts
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Footer */}
      <div
        style={{
          marginTop: '3rem',
          padding: '1.5rem',
          background: 'rgba(168, 85, 247, 0.05)',
          borderRadius: '0.75rem',
          border: '1px solid rgba(168, 85, 247, 0.2)',
        }}
      >
        <p
          style={{
            margin: 0,
            textAlign: 'center',
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem',
          }}
        >
          💡 Tip: Use cards to group related information and actions. Maintain consistent padding and spacing.
        </p>
      </div>
    </div>
  ),
}
