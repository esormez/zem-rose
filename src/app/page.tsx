'use client';

import { useState } from 'react';
import HorizontalScroll from '@/components/HorizontalScroll';
import Card from '@/components/Card';
import ProgressIndicator from '@/components/ProgressIndicator';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isOutlineMode, setIsOutlineMode] = useState(false);

  return (
    <main className="min-h-screen relative">
      <HorizontalScroll onScroll={setScrollProgress}>
        {/* Card 1: Home/Intro */}
        <Card isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col items-center justify-center text-center">
            <h1
              className="text-6xl font-bold tracking-tight mb-4"
              style={isOutlineMode ? {
                color: 'transparent',
                WebkitTextStroke: '1px var(--text-secondary)',
              } : { color: 'var(--text-primary)' }}
            >
              John Zemrose
            </h1>
            <p
              className="text-lg mb-12"
              style={isOutlineMode ? {
                color: 'transparent',
                WebkitTextStroke: '1px var(--text-secondary)',
              } : { color: 'var(--text-secondary)' }}
            >
              Dynamic Technical Professional
            </p>

            {/* Metrics */}
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div
                  className="text-4xl font-bold font-mono mb-2"
                  style={isOutlineMode ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--text-secondary)',
                  } : { color: 'var(--text-accent)' }}
                >
                  Expertise 
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={isOutlineMode ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--text-secondary)',
                  } : { color: 'var(--text-secondary)' }}
                >
                  BIE • DE • MLE • GenAI • TPM • SA
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-4xl font-bold font-mono mb-2"
                  style={isOutlineMode ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--text-secondary)',
                  } : { color: 'var(--text-accent)' }}
                >
                  12+ yrs
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={isOutlineMode ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--text-secondary)',
                  } : { color: 'var(--text-secondary)' }}
                >
                  Amazon/AWS Tenure
                </div>
              </div>

              <div className="text-center">
                <div
                  className="text-4xl font-bold font-mono mb-2"
                  style={isOutlineMode ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--text-secondary)',
                  } : { color: 'var(--text-accent)' }}
                >
                  4x 
                </div>
                <div
                  className="text-xs uppercase tracking-wider"
                  style={isOutlineMode ? {
                    color: 'transparent',
                    WebkitTextStroke: '1px var(--text-secondary)',
                  } : { color: 'var(--text-secondary)' }}
                >
                  AWS Certified
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Card 2: AI-Native Engineering */}
        <Card href="/ai-native" isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-primary)' }}
              >
                AI-Native Engineering
              </h2>
              <p
                className="text-base mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Leading organization-wide AI transformation across 210+ engineers.
              </p>
            </div>

            <div>
              <div
                className="text-4xl font-mono font-bold mb-2"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                88% AI Adoption Increase
              </div>
              <div
                className="text-xs uppercase tracking-wider mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '0.3px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                (43.9% → 82.7%)
              </div>

              <div
                className="text-sm"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                View Case Study →
              </div>
            </div>
          </div>
        </Card>

        {/* Card 3: Machine Learning */}
        <Card href="/machine-learning" isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-primary)' }}
              >
                Machine Learning
              </h2>
              <p
                className="text-base mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Production ML systems and model lifecycle management at scale.
              </p>
            </div>

            <div>
              <div
                className="text-4xl font-mono font-bold mb-2"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                [Key Metric]
              </div>
              <div
                className="text-xs uppercase tracking-wider mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '0.3px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                ML Platform Performance
              </div>

              <div
                className="text-sm"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                View Case Study →
              </div>
            </div>
          </div>
        </Card>

        {/* Card 4: Data Engineering */}
        <Card href="/data-engineering" isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-primary)' }}
              >
                Data Engineering
              </h2>
              <p
                className="text-base mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Analytics decoupling and data pipeline optimization.
              </p>
            </div>

            <div>
              <div
                className="text-4xl font-mono font-bold mb-2"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                [Key Metric]
              </div>
              <div
                className="text-xs uppercase tracking-wider mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '0.3px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Platform Modernization
              </div>

              <div
                className="text-sm"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                View Case Study →
              </div>
            </div>
          </div>
        </Card>

        {/* Card 5: Business Intelligence */}
        <Card href="/business-intelligence" isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-primary)' }}
              >
                Business Intelligence
              </h2>
              <p
                className="text-base mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Self-service analytics and data democratization.
              </p>
            </div>

            <div>
              <div
                className="text-4xl font-mono font-bold mb-2"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                [Key Metric]
              </div>
              <div
                className="text-xs uppercase tracking-wider mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '0.3px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Enterprise BI Transformation
              </div>

              <div
                className="text-sm"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                View Case Study →
              </div>
            </div>
          </div>
        </Card>

        {/* Card 6: About/Certifications */}
        <Card href="/about" isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-primary)' }}
              >
                About
              </h2>
              <p
                className="text-base mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                12+ years at Amazon. Principal TPM specializing in AI and data platforms.
              </p>
            </div>

            <div>
              <div
                className="text-4xl font-mono font-bold mb-2"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                4 AWS Certifications
              </div>
              <div
                className="text-xs uppercase tracking-wider mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '0.3px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Professional & Associate Levels
              </div>

              <div
                className="text-sm"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                View Details →
              </div>
            </div>
          </div>
        </Card>

        {/* Card 7: Contact */}
        <Card href="/contact" isOutlineMode={isOutlineMode}>
          <div className="h-full flex flex-col justify-between">
            <div>
              <h2
                className="text-3xl font-bold mb-4"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-primary)' }}
              >
                Let's Connect
              </h2>
              <p
                className="text-base mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Get in touch for opportunities or collaboration.
              </p>
            </div>

            <div>
              <div
                className="text-lg mb-8"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-secondary)' }}
              >
                Email · LinkedIn
              </div>

              <div
                className="text-sm"
                style={isOutlineMode ? {
                  color: 'transparent',
                  WebkitTextStroke: '1px var(--text-secondary)',
                } : { color: 'var(--text-accent)' }}
              >
                View Contact Info →
              </div>
            </div>
          </div>
        </Card>
      </HorizontalScroll>

      {/* Theme toggle plus sign - centered on page */}
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 cursor-pointer transition-opacity hover:opacity-70"
        onClick={() => setIsOutlineMode(!isOutlineMode)}
        style={{
          width: '20px',
          height: '20px',
        }}
      >
        {/* Horizontal line */}
        <div
          style={{
            position: 'absolute',
            width: '20px',
            height: '1px',
            backgroundColor: 'var(--text-secondary)',
            top: '50%',
            left: '0',
            transform: 'translateY(-50%)',
          }}
        />
        {/* Vertical line */}
        <div
          style={{
            position: 'absolute',
            width: '1px',
            height: '20px',
            backgroundColor: 'var(--text-secondary)',
            left: '50%',
            top: '0',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Progress indicator */}
      <ProgressIndicator progress={scrollProgress} />
    </main>
  );
}
