'use client';

import * as React from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterProps {
  dict: {
    title: string;
    subtitle: string;
    placeholder: string;
    button: string;
    success: string;
    error: string;
  };
}

export function Newsletter({ dict }: NewsletterProps) {
  const [email, setEmail] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: '✨ ' + dict.success,
      });
      setEmail('');
    } catch (error) {
      toast({
        title: '❌ ' + dict.error,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="border-t py-16 sm:py-24 bg-gray-50">
      <div className="container px-4 mx-auto">
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            {dict.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground"
          >
            {dict.subtitle}
          </motion.p>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          onSubmit={handleSubmit}
          className="mx-auto mt-10 flex max-w-md gap-x-4 px-4 sm:px-0"
        >
          <Input
            type="email"
            required
            placeholder={dict.placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="min-w-0 flex-auto shadow-sm"
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <span className="inline-block animate-spin">⏳</span>
            ) : (
              dict.button
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}